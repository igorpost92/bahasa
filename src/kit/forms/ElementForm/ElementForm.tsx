import React, { useEffect } from 'react';
import styles from './ElementForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner } from '../../index';
import { AppPage } from '../../../components/AppPage/AppPage';
import { usePromise } from '../../hooks';

interface Actions {
  save: (goBack: boolean) => void;
}

interface Props<T, P> {
  listUrl: string;
  children: React.ReactNode | ((actions: Actions) => React.ReactNode);
  isNew: boolean;
  getData: () => Promise<T>;
  onDataLoaded: (data: T) => void;
  onSave: (handler: (data: P) => void) => () => void;
  // TODO: not ok for language, change code => id
  onCreate: (data: P) => Promise<{ id: number | string }[]>;
  onUpdate: (data: P) => Promise<unknown>;
  onDelete: () => Promise<unknown>;
}

export function ElementForm<T, P>(props: Props<T, P>) {
  const navigate = useNavigate();

  const loadingRequest = usePromise(props.getData, !props.isNew);

  useEffect(() => {
    if (!props.isNew) {
      loadingRequest.send();
    }
  }, []);

  useEffect(() => {
    if (loadingRequest.data) {
      props.onDataLoaded(loadingRequest.data);
    }
  }, [loadingRequest.data]);

  const savingRequest = usePromise(async (data: P, goBack = true) => {
    if (props.isNew) {
      const result = await props.onCreate(data);

      if (!goBack) {
        const id = result[0].id;
        navigate(`${props.listUrl}/${id}`, { replace: true });

        return;
      }
    } else {
      await props.onUpdate(data);
    }

    navigate(props.listUrl);
  });

  const onSave = (goBack = true) => {
    const handler = props.onSave(data => {
      savingRequest.send(data, goBack);
    });

    handler();
  };

  const deletingRequest = usePromise(async () => {
    if (props.isNew) {
      return;
    }

    // TODO:
    if (!confirm('Are you sure?')) {
      return;
    }

    await props.onDelete();
    navigate(props.listUrl);
  });

  useEffect(() => {
    // TODO: alert

    if (savingRequest.error) {
      alert(savingRequest.error);
    } else if (deletingRequest.error) {
      alert(deletingRequest.error);
    }
  }, [savingRequest.error, deletingRequest.error]);

  let content;
  if (loadingRequest.isLoading) {
    content = <Spinner />;
  } else if (loadingRequest.error) {
    content = <div>{loadingRequest.error}</div>;
  } else {
    if (typeof props.children === 'function') {
      content = props.children({ save: onSave });
    } else {
      content = props.children;
    }

    content = (
      <>
        <form>{content}</form>
        {!props.isNew && (
          <Button
            intent={'danger'}
            onClick={deletingRequest.send}
            className={styles.deleteBtn}
            isLoading={deletingRequest.isLoading}
            isDisabled={savingRequest.isLoading}
          >
            Delete
          </Button>
        )}
      </>
    );
  }

  return (
    <AppPage
      headerLeft={
        <>
          <Link to={props.listUrl}>
            <Button>Back</Button>
          </Link>

          <Button
            intent={'success'}
            onClick={onSave}
            isLoading={savingRequest.isLoading}
            // TODO: form invalid
            isDisabled={deletingRequest.isLoading}
          >
            Save
          </Button>
        </>
      }
      contentClassName={styles.contentWrap}
    >
      {content}
    </AppPage>
  );
}

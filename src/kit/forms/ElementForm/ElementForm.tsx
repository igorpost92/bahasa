import React, { useEffect } from 'react';
import styles from './ElementForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner } from '../../index';
import { AppPage } from '../../../components/AppPage/AppPage';
import { usePromise } from '../../hooks/usePromise';

interface Config {
  save: (goBack: boolean) => void;
}

interface Props<T> {
  // todo
  // isSubmitDisabled?: boolean
  listUrl: string;
  // TODO: naming
  children: React.ReactNode | ((config: Config) => React.ReactNode);
  isNew: boolean;
  isLoading?: boolean;
  error?: string | null;
  // TODO: not ok for language, change code => id
  onAdd: () => Promise<{ id: number | string }[]>;
  onUpdate: () => Promise<unknown>;
  onDelete: () => Promise<unknown>;
}

export function ElementForm<T>(props: Props<T>) {
  const navigate = useNavigate();

  const savingPromise = usePromise(async (goBack = true) => {
    if (props.isNew) {
      const result = await props.onAdd();

      if (!goBack) {
        const id = result[0].id;
        navigate(`${props.listUrl}/${id}`, { replace: true });

        return;
      }
    } else {
      await props.onUpdate();
    }

    navigate(props.listUrl);
  });

  const deletingPromise = usePromise(async () => {
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

    if (savingPromise.error) {
      alert(savingPromise.error);
    } else if (deletingPromise.error) {
      alert(deletingPromise.error);
    }
  }, [savingPromise.error, deletingPromise.error]);

  let content;
  if (props.isLoading) {
    content = <Spinner />;
  } else if (props.error) {
    content = <div>{props.error}</div>;
  } else {
    if (typeof props.children === 'function') {
      content = props.children({ save: savingPromise.send });
    } else {
      content = props.children;
    }

    content = (
      <>
        {content}
        {!props.isNew && (
          <Button
            intent={'danger'}
            onClick={deletingPromise.send}
            className={styles.deleteBtn}
            isLoading={deletingPromise.isLoading}
            isDisabled={savingPromise.isLoading}
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
            onClick={savingPromise.send}
            isLoading={savingPromise.isLoading}
            isDisabled={deletingPromise.isLoading}
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

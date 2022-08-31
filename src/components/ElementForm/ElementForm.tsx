import React, { useEffect } from 'react';
import styles from './ElementForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../kit/components/Button/Button';
import AppPage from '../AppPage/AppPage';
import Spinner from '../../kit/components/Spinner/Spinner';
import { usePromise } from '../../hooks/usePromise';

interface Config {
  save: (goBack: boolean) => void;
}

interface Props<T> {
  listUrl: string;
  // TODO: naming
  children: React.ReactNode | ((config: Config) => React.ReactNode);
  isNew: boolean;
  isLoading?: boolean;
  error?: string | null;
  // TODO: not ok for language, change code => id
  onSave: () => Promise<{ id: number }[]>;
  onDelete: () => Promise<unknown>;
}

function ElementForm<T>(props: Props<T>) {
  const navigate = useNavigate();

  const savingPromise = usePromise(async (goBack = true) => {
    const result = await props.onSave();

    if (goBack) {
      navigate(props.listUrl);
    } else {
      const id = result[0].id;
      navigate(`${props.listUrl}/${id}`, { replace: true });
    }
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
    if (savingPromise.error || deletingPromise.error) {
      // TODO:
      alert('error');
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
            type={'danger'}
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
            type={'success'}
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

export default ElementForm;

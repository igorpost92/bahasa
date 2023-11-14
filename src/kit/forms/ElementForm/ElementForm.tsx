import React, { useEffect } from 'react';
import styles from './ElementForm.module.scss';
import { Button, Header } from '../../index';
import { usePromise } from '../../hooks';

interface Actions {
  save: () => void;
}

// TODO: confirm before leave

// TODO: to ElementFormModal

interface Props<T, P> {
  children: React.ReactNode | ((actions: Actions) => React.ReactNode);
  isNew: boolean;
  getData: () => Promise<T>;
  onDataLoaded: (data: T) => void;
  onCreate: (data: P) => Promise<unknown>;
  onUpdate: (data: P) => Promise<unknown>;
  onSave: (handler: (data: P) => void) => () => void;
  onDelete: () => Promise<unknown>;
  onClose: () => void;
  readOnly?: boolean;
  title?: string;
}

export function ElementForm<T, P>(props: Props<T, P>) {
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

  const savingRequest = usePromise(async (data: P) => {
    if (props.isNew) {
      await props.onCreate(data);
    } else {
      await props.onUpdate(data);
    }

    props.onClose();
  });

  const onSave = () => {
    const handler = props.onSave(data => {
      savingRequest.send(data);
    });

    handler();
  };

  const deletingRequest = usePromise(async () => {
    if (props.isNew) {
      return;
    }

    if (!confirm('Are you sure?')) {
      return;
    }

    await props.onDelete();

    props.onClose();
  });

  useEffect(() => {
    // TODO: use promise props onError
    if (savingRequest.error) {
      alert(savingRequest.error);
    } else if (deletingRequest.error) {
      alert(deletingRequest.error);
    }
  }, [savingRequest.error, deletingRequest.error]);

  let content;
  if (loadingRequest.isLoading) {
    // content = <Spinner />;
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
        <form className={styles.form}>{content}</form>
        {!props.isNew && !props.readOnly && (
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
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Header
          showSeparator={true}
          left={<Button onClick={props.onClose}>Back</Button>}
          center={props.title}
          right={
            !props.readOnly && (
              <Button
                intent={'primary'}
                onClick={onSave}
                isLoading={savingRequest.isLoading}
                // TODO: if form invalid
                isDisabled={deletingRequest.isLoading}
              >
                Save
              </Button>
            )
          }
        />
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}

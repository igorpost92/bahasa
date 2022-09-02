import React from 'react';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  // TODO:
  // canClose?: boolean;

  // TODO: position left
}

export const Drawer: React.FC<Props> = props => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.wrap}>
        <div className={styles.backdrop} onClick={props.onClose} />
        <div className={styles.content}>{props.children}</div>
      </div>
    </Portal>
  );
};

import React from 'react';
import cn from 'classnames';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  big?: boolean;
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
        <div className={cn(styles.content, props.big && styles.big)}>{props.children}</div>
      </div>
    </Portal>
  );
};

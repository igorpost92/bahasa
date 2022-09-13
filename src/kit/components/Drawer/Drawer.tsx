import React from 'react';
import cn from 'classnames';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface Props {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'm' | 'l' | 'xl';
  // TODO:
  // canClose?: boolean;

  // TODO: position left
}

// TODO: block background scroll

export const Drawer: React.FC<Props> = props => {
  if (!props.isOpen) {
    return null;
  }

  const { size = 'm' } = props;

  return (
    <Portal>
      <div className={styles.wrap}>
        <div
          className={styles.backdrop}
          onClick={props.onClose}
          onContextMenu={e => {
            // for desktop
            e.preventDefault();
          }}
        />
        <div
          className={cn(styles.content, props.className, {
            [styles.l]: size === 'l',
            [styles.xl]: size === 'xl',
          })}
        >
          {props.children}
        </div>
      </div>
    </Portal>
  );
};

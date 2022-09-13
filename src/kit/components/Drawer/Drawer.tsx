import React from 'react';
import cn from 'classnames';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useScrollLock } from '../../hooks';

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

export const Drawer: React.FC<Props> = props => {
  useScrollLock(props.isOpen);

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

import React from 'react';
import styles from './Drawer.module.scss';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  // TODO: position left
}

const Drawer: React.FC<Props> = props => {
  return (
    <div className={styles.wrap}>
      <div className={styles.backdrop} />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Drawer;

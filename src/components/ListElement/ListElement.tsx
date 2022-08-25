import React from 'react';
import styles from './ListElement.module.scss';
import cn from 'classnames';

interface Props {
  className?: string
  children: React.ReactNode
}

const ListElement: React.FC<Props> = (props) => {
  return (
    <div className={cn(styles.wrap, props.className)}>
      {props.children}
    </div>
  );
};

export default ListElement;

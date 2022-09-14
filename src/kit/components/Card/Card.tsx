import React from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<Props> = props => {
  return (
    <div onClick={props.onClick} className={cn(styles.wrap, props.className)}>
      {props.children}
    </div>
  );
};

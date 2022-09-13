import React from 'react';
import styles from './Tag.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Tag: React.FC<Props> = props => {
  return <div className={cn(styles.wrap, props.className)}>{props.children}</div>;
};

import React from 'react';
import styles from './TabBar.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const TabBar: React.FC<Props> = props => {
  return <div className={cn(styles.wrap, props.className)}>{props.children}</div>;
};

export default TabBar;

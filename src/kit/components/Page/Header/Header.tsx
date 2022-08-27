import React from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Header: React.FC<Props> = props => {
  return <div className={cn(styles.wrap, props.className)}>{props.children}</div>;
};

export default Header;

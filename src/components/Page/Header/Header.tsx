import React from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  leftSlot?: React.ReactNode;
  children?: React.ReactNode;
}

const Header: React.FC<Props> = props => {
  const showHeader = Boolean(props.children || props.leftSlot);

  if (!showHeader) {
    return null;
  }

  const className = cn(styles.wrap, props.className);

  if (props.children) {
    return <div className={className}>{props.children}</div>;
  }

  return <div className={cn(className, styles.row)}>{props.leftSlot}</div>;
};

export default Header;

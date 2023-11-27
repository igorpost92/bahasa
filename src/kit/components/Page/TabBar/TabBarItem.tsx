import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TabBar.module.scss';
import cn from 'classnames';

interface Props {
  url: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const TabBarItem: React.FC<Props> = props => {
  return (
    <NavLink
      to={props.url}
      replace
      className={({ isActive }) => cn(styles.item, isActive && styles.active)}
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  );
};

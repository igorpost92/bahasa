import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TabBar.module.scss';
import cn from 'classnames';

interface Props {
  url: string;
  children: React.ReactNode;
}

export const TabBarItem: React.FC<Props> = props => {
  return (
    <NavLink
      to={props.url}
      replace
      className={({ isActive }) => cn(styles.item, isActive && styles.active)}
    >
      {props.children}
    </NavLink>
  );
};

import React, { cloneElement } from 'react';
import styles from './ControlGroup.module.css';
import cn from 'classnames';

interface Props {
  className?: string;
  id: string;
  label?: string;
  children: React.ReactElement;
  intent?: 'danger';
  description?: string;
}

export const ControlGroup: React.FC<Props> = props => {
  return (
    <div className={cn(styles.wrap, props.className)}>
      {props.label && (
        <label className={styles.label} htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {cloneElement(props.children, { id: props.id })}
      {props.description && (
        <div className={cn(styles.description, props.intent === 'danger' && styles.danger)}>
          {props.description}
        </div>
      )}
    </div>
  );
};

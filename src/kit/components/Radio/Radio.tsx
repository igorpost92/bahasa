import React from 'react';
import styles from './Radio.module.css';
import cn from 'classnames';

interface Props {
  className?: string;
  isChecked?: boolean;
  onChange: () => void;
  label?: string;
  children?: React.ReactNode;
}

export const Radio: React.FC<Props> = props => {
  const label = props.children || props.label;

  return (
    <div className={cn(styles.wrap, props.className)} onClick={props.onChange}>
      <div className={cn(styles.marker, props.isChecked && styles.checked)} />
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};

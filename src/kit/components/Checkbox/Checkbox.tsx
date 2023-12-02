import React, { useState } from 'react';
import styles from './Checkbox.module.css';
import cn from 'classnames';

interface Props {
  className?: string;
  children?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

let id = 0;

export const Checkbox: React.FC<Props> = props => {
  const [elementId] = useState(() => String(++id));

  const { labelPosition = 'right' } = props;

  return (
    <label className={cn(styles.wrap, props.className)}>
      {labelPosition === 'left' && <span className={styles.label}>{props.children}</span>}
      <input
        type={'checkbox'}
        id={elementId}
        checked={props.checked}
        onChange={() => props.onChange?.(!props.checked)}
      />
      {labelPosition === 'right' && <span className={styles.label}>{props.children}</span>}
    </label>
  );
};

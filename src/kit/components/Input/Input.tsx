import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

interface Props {
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = props => {
  return (
    <input
      id={props.id}
      className={cn(styles.wrap, props.className)}
      placeholder={props.placeholder}
      autoCapitalize={'none'}
      autoComplete={'off'}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
    />
  );
};

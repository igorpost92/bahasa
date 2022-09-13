import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

type NativeElementProps = JSX.IntrinsicElements['input'];

export interface InputProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: NativeElementProps['type'];
  inputMode?: NativeElementProps['inputMode']; //todo not used
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = props => {
  return (
    <input
      id={props.id}
      className={cn(styles.wrap, props.className, props.fullWidth && styles.fullWidth)}
      placeholder={props.placeholder}
      autoCapitalize={'none'}
      autoComplete={'off'}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      type={props.type}
    />
  );
};

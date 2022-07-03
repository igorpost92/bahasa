import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = (props) => {
  return (
    <input
      className={cn(styles.wrap, props.className)}
      placeholder={props.placeholder}
      autoCapitalize={'none'}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default Input;

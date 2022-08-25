import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  type?: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'l' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<Props> = props => {
  const { type = 'secondary', size = 'x' } = props;

  return (
    <button
      className={cn(styles.wrap, styles[type], styles[size], props.fullWidth && styles.fullWidth, props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

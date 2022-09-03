import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';
import { Spinner } from '..';

interface Props {
  className?: string;
  intent?: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'm' | 'l' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: JSX.IntrinsicElements['button']['type']
}

export const Button: React.FC<Props> = props => {
  const { intent = 'secondary', size = 'l', type = 'button' } = props;

  const onClick = () => {
    if (props.isLoading || props.isDisabled) {
      return;
    }

    props.onClick?.();
  };

  return (
    <button
      disabled={props.isDisabled}
      className={cn(
        styles.wrap,
        styles[intent],
        styles[size],
        props.fullWidth && styles.fullWidth,
        props.className,
      )}
      onClick={onClick}
      type={type}
    >
      {props.isLoading && <Spinner className={styles.spinner} />}
      {props.children}
    </button>
  );
};

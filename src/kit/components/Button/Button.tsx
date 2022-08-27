import React from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';
import Spinner from '../Spinner/Spinner';

interface Props {
  className?: string;
  type?: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'l' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button: React.FC<Props> = props => {
  const { type = 'secondary', size = 'x' } = props;

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
        styles[type],
        styles[size],
        props.fullWidth && styles.fullWidth,
        props.className,
      )}
      onClick={onClick}
    >
      {props.isLoading && <Spinner className={styles.spinner} />}
      {props.children}
    </button>
  );
};

export default Button;

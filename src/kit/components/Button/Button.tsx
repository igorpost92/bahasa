import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Spinner } from '..';
import styles from './Button.module.css';

export interface ButtonProps {
  className?: string;
  intent?: 'primary' | 'secondary' | 'danger';
  variant?: 'filled' | 'outline' | 'minimal';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'm' | 'l' | 'xl';
  alignContent?: 'left' | 'center';
  fullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: JSX.IntrinsicElements['button']['type'];
  url?: string;
}

export const Button: React.FC<ButtonProps> = props => {
  const {
    intent = 'secondary',
    size = 'l',
    type = 'button',
    variant = 'filled',
    alignContent = 'center',
  } = props;

  const onClick = () => {
    if (props.isLoading || props.isDisabled) {
      return;
    }

    props.onClick?.();
  };

  const className = cn(
    props.className,
    styles.wrap,
    styles[variant],
    styles[intent],
    styles[size],
    props.fullWidth && styles.fullWidth,
    alignContent === 'left' && styles.left,
  );

  let content = (
    <>
      {props.isLoading && <Spinner className={styles.spinner} />}
      {props.children}
    </>
  );

  if (props.url) {
    // TODO: disabled
    return (
      <Link to={props.url} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} type={type} disabled={props.isDisabled}>
      {content}
    </button>
  );
};

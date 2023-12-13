import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Spinner } from '..';
import styles from './Button.module.css';

// TODO:
// type Variant = 'filled' | 'outlined' | 'minimal'

type Props = {
  className?: string;
  intent?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'm' | 'l' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: JSX.IntrinsicElements['button']['type'];
  url?: string;
};

export const Button: React.FC<Props> = props => {
  const { intent = 'secondary', size = 'l', type = 'button' } = props;

  const onClick = () => {
    if (props.isLoading || props.isDisabled) {
      return;
    }

    props.onClick?.();
  };

  const className = cn(
    styles.wrap,
    styles[intent],
    styles[size],
    props.fullWidth && styles.fullWidth,
    props.className,
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

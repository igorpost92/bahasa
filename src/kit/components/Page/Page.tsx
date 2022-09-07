import React from 'react';
import cn from 'classnames';
import styles from './Page.module.scss';

interface Props {
  className?: string;
  footerClassName?: string;
  contentClassName?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const Page: React.FC<Props> = props => {
  return (
    <div className={cn(styles.wrap, props.className)}>
      {props.header && <header className={styles.header}>{props.header}</header>}
      <main className={cn(styles.content, props.contentClassName)}>{props.children}</main>
      {props.footer && <div className={styles.footer}>{props.footer}</div>}
    </div>
  );
};

import React from 'react';
import cn from 'classnames';
import styles from './Page.module.scss';
import Header from './Header/Header';

interface Props {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Page: React.FC<Props> = props => {
  return (
    <div className={cn(styles.wrap, props.className)}>
      {props.header && <Header className={props.headerClassName}>{props.header}</Header>}
      <main className={cn(styles.content, props.contentClassName)}>{props.children}</main>
    </div>
  );
};

export default Page;

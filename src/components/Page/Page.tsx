import React from 'react';
import cn from 'classnames';
import Header from './Header/Header';
import styles from './Page.module.scss';

interface Props {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
  headerLeft?: React.ReactNode;
  showLang?: boolean;
  showHeaderBorder?: boolean;
  contentClassName?: string;
}

const Page: React.FC<Props> = props => {
  const { showHeaderBorder = true } = props;

  return (
    <div className={styles.wrap}>
      <Header
        className={cn(styles.header, showHeaderBorder && styles.headerBorder)}
        showLang={props.showLang}
        leftSlot={props.headerLeft}
      >
        {props.customHeader}
      </Header>
      <div className={cn(styles.content, props.contentClassName)}>{props.children}</div>
    </div>
  );
};

export default Page;

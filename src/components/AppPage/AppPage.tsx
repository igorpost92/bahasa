import React from 'react';
import styles from './AppPage.module.scss';
import Page from '../../kit/components/Page/Page';
import AppHeader from './AppHeader/AppHeader';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerBottom?: React.ReactNode;
  showHeader?: boolean;
  showLang?: boolean;
  showHeaderBorder?: boolean;
  contentClassName?: string;
}

const AppPage: React.FC<Props> = props => {
  const { showHeaderBorder = true, showHeader = true } = props;

  return (
    <Page
      contentClassName={props.contentClassName}
      header={
        showHeader && (
          <AppHeader
            className={cn(showHeaderBorder && styles.headerBorder)}
            showLang={props.showLang}
            leftSlot={props.headerLeft}
            titleSlot={props.headerTitle}
            bottomSlot={props.headerBottom}
          >
            {props.customHeader}
          </AppHeader>
        )
      }
    >
      {props.children}
    </Page>
  );
};

export default AppPage;

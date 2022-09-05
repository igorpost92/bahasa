import React from 'react';
import styles from './AppPage.module.scss';
import { Page, TabBar, TabBarItem } from '../../kit';
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
  showTabBar?: boolean;
}

export const AppPage: React.FC<Props> = props => {
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
      footer={
        props.showTabBar && (
          <TabBar>
            <TabBarItem url={'/words'}>Words</TabBarItem>
            <TabBarItem url={'/learn'}>Learn</TabBarItem>
            <TabBarItem url={'/categories'}>Categories</TabBarItem>
          </TabBar>
        )
      }
    >
      {props.children}
    </Page>
  );
};

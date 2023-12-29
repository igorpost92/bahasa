import React from 'react';
import { Page, Header, TabBar, TabBarItem } from '../../kit';
import SelectedLangButton from '../SelectedLangButton/SelectedLangButton';
import styles from './AppPage.module.css';
import SideMenuButton from './SideMenuButton/SideMenuButton';

interface Props {
  children: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  showLang?: boolean;
  showSideMenuButton?: boolean;
  headerBottom?: React.ReactNode;
  showHeader?: boolean;
  showHeaderBorder?: boolean;
  contentClassName?: string;
  showTabBar?: boolean;
}

export const AppPage: React.FC<Props> = props => {
  const { showHeader = true, showLang = true, showSideMenuButton = true } = props;

  let headerElement;
  if (showHeader) {
    headerElement = (
      <Header
        showSeparator={props.showHeaderBorder}
        left={props.headerLeft ?? (showSideMenuButton && <SideMenuButton />)}
        center={props.headerTitle}
        right={props.headerRight ?? (showLang && <SelectedLangButton />)}
        bottom={props.headerBottom}
      />
    );
  }

  return (
    <Page
      className={styles.wrap}
      contentClassName={props.contentClassName}
      header={headerElement}
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

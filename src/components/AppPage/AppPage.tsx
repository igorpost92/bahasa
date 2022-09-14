import React from 'react';
import { Page, Header, TabBar, TabBarItem } from '../../kit';
import SelectedLangButton from '../SelectedLangButton/SelectedLangButton';
import { getUser } from '../../api/methods/auth';
import { FAKE_EMAIL } from '../../constants/fakeEmail';
import { Settings } from '../../kit/icons';

interface Props {
  children: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  showLang?: boolean;
  headerBottom?: React.ReactNode;
  showHeader?: boolean;
  showHeaderBorder?: boolean;
  contentClassName?: string;
  showTabBar?: boolean;
}

export const AppPage: React.FC<Props> = props => {
  const user = getUser();

  const { showHeader = true, showLang = true } = props;

  return (
    <Page
      contentClassName={props.contentClassName}
      header={
        showHeader && (
          <Header
            showSeparator={props.showHeaderBorder}
            left={props.headerLeft}
            center={props.headerTitle}
            right={props.headerRight ?? (showLang && <SelectedLangButton />)}
            bottom={props.headerBottom}
          />
        )
      }
      footer={
        props.showTabBar && (
          <TabBar>
            <TabBarItem url={'/words'}>Words</TabBarItem>
            <TabBarItem url={'/learn'}>Learn</TabBarItem>
            <TabBarItem url={'/categories'}>Categories</TabBarItem>
            {user?.email !== FAKE_EMAIL && (
              <TabBarItem url={'/settings'}>
                <Settings />
              </TabBarItem>
            )}
          </TabBar>
        )
      }
    >
      {props.children}
    </Page>
  );
};

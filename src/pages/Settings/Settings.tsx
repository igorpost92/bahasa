import React from 'react';
import styles from './Settings.module.scss';
import { Button } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import Sync from './Sync/Sync';

const Settings: React.FC = () => {
  return (
    <AppPage headerTitle={'Settings'} showTabBar>
      <Button url={'/login'} fullWidth>
        Login
      </Button>
      <br />
      <Sync />
    </AppPage>
  );
};

export default Settings;

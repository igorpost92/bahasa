import React, { useState } from 'react';
import styles from './Settings.module.scss';
import { Button } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import { getUser } from '../../api/methods/auth';
import Sync from './Sync/Sync';

const Settings: React.FC = () => {
  const user = getUser();

  return (
    <AppPage headerTitle={'Settings'} showTabBar>
      {user ? (
        <Sync />
      ) : (
        <Button url={'/login'} fullWidth>
          Login
        </Button>
      )}
    </AppPage>
  );
};

export default Settings;

import React from 'react';
import { Button } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import Sync from './Sync/Sync';
import { useMainStore } from '../../stores/mainStore';

const Settings: React.FC = () => {
  const mainStore = useMainStore();

  const content = mainStore.isSuperMode ? (
    <>
      <Button url={'/login'} fullWidth>
        Login (Supabase)
      </Button>
      <br />
      <br />
      <Sync />
      <br />
      <br />
      <br />
      <br />
      <Button onClick={() => mainStore.setSuperMode(false)} intent={'danger'}>
        Disable super mode
      </Button>
    </>
  ) : (
    <h4>Not allowed at the moment</h4>
  );

  return (
    <AppPage headerTitle={'Settings'} showTabBar>
      {content}
    </AppPage>
  );
};

export default Settings;

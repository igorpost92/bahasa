import React from 'react';
import { Button } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import Sync from './Sync/Sync';
import { useMainStore } from '../../stores/mainStore';
import BackButton from '../../components/BackButton/BackButton';
import { useSuperModeActivator } from '../../components/AppPage/useSuperModeActivator';

const Settings: React.FC = () => {
  const isSuperMode = useMainStore(store => store.isSuperMode);
  const setSuperMode = useMainStore(store => store.setSuperMode);

  const onSettingsClick = useSuperModeActivator();

  const pageTitle = <div onClick={onSettingsClick}>Settings</div>;

  const content = isSuperMode ? (
    <>
      <Button url={'/login'} fullWidth>
        Login
      </Button>
      <br />
      <br />
      <Sync />
      <br />
      <br />
      <br />
      <br />
      <Button onClick={() => setSuperMode(false)} intent={'danger'}>
        Disable super mode
      </Button>
    </>
  ) : (
    <h4>Not allowed at the moment</h4>
  );

  return (
    <AppPage headerLeft={<BackButton />} headerTitle={pageTitle} showTabBar showLang={false}>
      {content}
    </AppPage>
  );
};

export default Settings;

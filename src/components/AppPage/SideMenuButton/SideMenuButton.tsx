import React from 'react';
import { Button, MenuIcon } from '../../../kit';
import SideMenu from '../../SideMenu/SideMenu';
import { useMainStore } from '../../../stores/mainStore';

const SideMenuButton: React.FC = () => {
  const setMenuOpen = useMainStore(store => store.setSideMenuOpen);

  // TODO: move side menu outside of component?

  return (
    <>
      <Button onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </Button>
      <SideMenu />
    </>
  );
};

export default SideMenuButton;

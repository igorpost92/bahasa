import React from 'react';
import styles from './SideMenu.module.css';
import { Button, Drawer, SettingsIcon } from '../../kit';
import { useMainStore } from '../../stores/mainStore';

const SideMenu: React.FC = () => {
  const isOpen = useMainStore(store => store.isSideMenuOpen);
  const setOpen = useMainStore(store => store.setSideMenuOpen);

  const closeMenu = () => setOpen(false);

  return (
    <Drawer position={'left'} isOpen={isOpen} onClose={closeMenu}>
      <Button variant="minimal" url={'/settings'} onClick={closeMenu} alignContent={'left'}>
        <SettingsIcon className={styles.icon} />
        Settings
      </Button>
    </Drawer>
  );
};

export default SideMenu;

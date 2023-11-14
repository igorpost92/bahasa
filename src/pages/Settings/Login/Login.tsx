import React, { useState } from 'react';
import styles from './Login.module.scss';
import { ControlGroup, Input, Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { useNavigate } from 'react-router-dom';
import { getSupabaseKey, updateSupabaseKey } from '../../../api/sendRequest';

// TODO: form

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [key, setKey] = useState(() => getSupabaseKey() ?? '');

  const save = () => {
    if (!key) {
      return;
    }

    updateSupabaseKey(key);
    navigate('/settings');
  };

  return (
    <AppPage
      headerLeft={<Button url={'/settings'}>Close</Button>}
      headerRight={false}
      contentClassName={styles.pageWrap}
    >
      <div className={styles.form}>
        <ControlGroup id={'key'} label={'Key'}>
          <Input value={key} onChange={setKey} />
        </ControlGroup>
      </div>
      <Button className={styles.btnWrap} intent={'primary'} onClick={save}>
        Login
      </Button>
    </AppPage>
  );
};

export default Login;

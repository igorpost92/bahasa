import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { ControlGroup, Input, Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { singIn } from '../../../api/methods/auth';
import { usePromise } from '../../../kit/hooks';
import { FAKE_EMAIL } from '../../../constants/fakeEmail';
import { useNavigate } from 'react-router-dom';

// TODO: form

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, error, data, send } = usePromise(() => {
    const correctedEmail = login.toLowerCase() === 'juan' ? FAKE_EMAIL : login;
    return singIn(correctedEmail, password);
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      navigate('/settings');
    }
  }, [data]);

  return (
    <AppPage
      headerLeft={<Button url={'/settings'}>Close</Button>}
      headerRight={false}
      contentClassName={styles.pageWrap}
    >
      <div className={styles.form}>
        <ControlGroup id={'login'} label={'Login'}>
          <Input value={login} onChange={setLogin} />
        </ControlGroup>
        <ControlGroup id={'password'} label={'Password'}>
          <Input value={password} onChange={setPassword} />
        </ControlGroup>
      </div>
      <Button className={styles.btnWrap} intent={'success'} onClick={send} isLoading={isLoading}>
        Login
      </Button>
    </AppPage>
  );
};

export default Login;

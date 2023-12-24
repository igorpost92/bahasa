import React, { useState } from 'react';
import styles from './Login.module.css';
import { ControlGroup, Input, Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { useNavigate } from 'react-router-dom';
import { LocalStorageTokens } from '../../../constants/localStorageTokens';
import { authApi } from '../../../api';
import { AxiosError } from 'axios';

const getName = () => localStorage.getItem(LocalStorageTokens.UserName) ?? '';
const getPassword = () => localStorage.getItem(LocalStorageTokens.UserPassword) ?? '';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(getName);
  const [password, setPassword] = useState(getPassword);

  const save = async () => {
    if (!name || !password) {
      alert('Provide data');
      return;
    }

    try {
      await authApi.signIn(name, password);

      localStorage.setItem(LocalStorageTokens.UserName, name);
      localStorage.setItem(LocalStorageTokens.UserPassword, password);
      navigate('/settings');
    } catch (e) {
      let message;
      if (e instanceof AxiosError) {
        message = e.response?.data?.message;
      }
      alert(message ?? 'Error during sign in');
    }
  };

  return (
    <AppPage
      headerLeft={<Button url={'/settings'}>Close</Button>}
      headerRight={false}
      contentClassName={styles.pageWrap}
    >
      <ControlGroup id={'key'} label={'Username'}>
        <Input value={name} onChange={setName} />
      </ControlGroup>
      <br />
      <ControlGroup id={'key'} label={'Password'}>
        <Input type={'password'} value={password} onChange={setPassword} />
      </ControlGroup>
      <br />
      <Button className={styles.btnWrap} intent={'primary'} onClick={save}>
        Login
      </Button>
    </AppPage>
  );
};

export default Login;

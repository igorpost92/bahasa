import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import ControlGroup from '../../../kit/components/ControlGroup/ControlGroup';
import Input from '../../../kit/components/Input/Input';
import Button from '../../../kit/components/Button/Button';
import AppPage from '../../AppPage/AppPage';
import { singIn } from '../../../api/methods';
import { usePromise } from '../../../hooks/usePromise';
import { FAKE_EMAIL } from '../../../constants/fakeEmail';

interface Props {
  onSuccess: () => void;
}

const Login: React.FC<Props> = props => {
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
      props.onSuccess();
    }
  }, [data]);

  return (
    <AppPage showHeader={false} contentClassName={styles.pageWrap}>
      <div className={styles.form}>
        <ControlGroup id={'login'} label={'Login'}>
          <Input value={login} onChange={setLogin} />
        </ControlGroup>
        <ControlGroup id={'password'} label={'Password'}>
          <Input value={password} onChange={setPassword} />
        </ControlGroup>
      </div>
      <Button className={styles.btnWrap} type={'success'} onClick={send} isLoading={isLoading}>
        Login
      </Button>
    </AppPage>
  );
};

export default Login;

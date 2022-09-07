import React, { useEffect } from 'react';
import { getUser, onAuthStateChange } from '../../api/methods/auth';
import Login from './Login/Login';
import { useForceRerender } from '../../kit/hooks';

interface Props {
  children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = props => {
  const rerender = useForceRerender();
  const user = getUser();

  useEffect(() => {
    onAuthStateChange(() => {
      rerender();
    });
  }, []);

  if (!user) {
    return <Login onSuccess={rerender} />;
  }

  return <>{props.children}</>;
};

export default AuthGuard;

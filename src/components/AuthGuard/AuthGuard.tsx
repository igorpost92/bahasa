import React from 'react';
import { getUser } from '../../api/methods/auth';
import Login from './Login/Login';
import { useForceRerender } from '../../hooks/useForceRerender';

interface Props {
  children: React.ReactNode;
}

const AuthGuard: React.FC<Props> = props => {
  const rerender = useForceRerender();
  const user = getUser();

  if (!user) {
    return <Login onSuccess={rerender} />;
  }

  return <>{props.children}</>;
};

export default AuthGuard;

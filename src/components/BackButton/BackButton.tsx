import React from 'react';
import { Button } from '../../kit';

interface Props {
  children?: React.ReactNode;
}

const BackButton: React.FC<Props> = props => {
  const { children = 'Back' } = props;

  return <Button url={-1 as any}>{children}</Button>;
};

export default BackButton;

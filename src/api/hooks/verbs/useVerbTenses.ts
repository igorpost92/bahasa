import { usePromise } from '../../../kit/hooks';
import { useLayoutEffect } from 'react';
import { getAllVerbs } from '../../methods/verbs';

export const useVerbTenses = () => {
  const { send, ...promise } = usePromise(getAllVerbs);

  useLayoutEffect(() => {
    send();
  }, []);

  return promise;
};

import { usePromise } from '../../kit/hooks';
import { getVerbs } from '../methods/verbs';
import { useLayoutEffect } from 'react';

export const useVerbsTenses = () => {
  // TODO: sort?
  const { isLoading, data, send, error } = usePromise(getVerbs);

  useLayoutEffect(() => {
    send();
  }, []);

  return { isLoading, data, error };
};

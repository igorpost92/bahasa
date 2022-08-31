import { useLayoutEffect } from 'react';
import { usePromise } from './usePromise';

export const usePromiseOnMount = <T>(fn: () => Promise<T>) => {
  const { send, ...promise } = usePromise(fn, true);

  useLayoutEffect(() => {
    send();
  }, []);

  return promise;
};

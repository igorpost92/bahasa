import { useLayoutEffect } from 'react';
import { usePromise } from './usePromise';

export const usePromiseOnMount = <T>(fn: () => Promise<T>) => {
  const promise = usePromise(fn, true);

  useLayoutEffect(() => {
    promise.send();
  }, []);

  return promise;
};

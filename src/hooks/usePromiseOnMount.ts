import { useLayoutEffect } from 'react';
import { usePromise } from './usePromise';

export const usePromiseOnMount = <T>(fn: () => Promise<T>) => {
  const { isLoading, data, isError, send } = usePromise(fn, true);

  useLayoutEffect(() => {
    send();
  }, []);

  return { isLoading, data, isError };
};

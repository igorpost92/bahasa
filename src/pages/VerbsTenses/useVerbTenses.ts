import { usePromise } from '../../hooks/usePromise';
import { useLayoutEffect } from 'react';
import { getAllVerbs } from '../../api/methods/verbs';

export const useVerbTenses = () => {
  const { isLoading, data, send, isError } = usePromise(getAllVerbs);

  useLayoutEffect(() => {
    send();
  }, []);

  return { isLoading, data, isError };
};

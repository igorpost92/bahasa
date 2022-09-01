import { useEffect } from 'react';
import { getWord } from '../../methods/words';
import { usePromise } from '../../../hooks/usePromise';

export const useWord = (id?: number) => {
  const { send, ...promise } = usePromise(async () => {
    if (id === undefined) {
      return null;
    }

    return getWord(id);
  }, true);

  useEffect(() => {
    send();
  }, [id]);

  return promise;
};

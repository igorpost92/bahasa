import { useEffect } from 'react';
import { getWord } from '../../methods/words';
import { usePromise } from '../../../hooks/usePromise';

export const useWord = (id?: string) => {
  const { send, ...promise } = usePromise(async () => {
    if (!id) {
      return null;
    }

    return getWord(id);
  }, true);

  useEffect(() => {
    // TODO: need here?
    // if (!id) {
    //   return;
    // }

    send();
  }, [id]);

  return promise;
};

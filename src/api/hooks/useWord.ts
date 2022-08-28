import { useEffect } from 'react';
import { getWord } from '../methods/words';
import { parseWordFromServer } from '../utils/parseWordFromServer';
import { usePromise } from '../../hooks/usePromise';

export const useWord = (id?: string) => {
  const { isLoading, data, send } = usePromise(async () => {
    // TODO: need here?
    if (!id) {
      return null;
    }

    const { data: result, error } = await getWord(id);
    if (result) {
      return parseWordFromServer(result);
    }
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    send();
  }, [id]);

  return { isLoading, data };
};

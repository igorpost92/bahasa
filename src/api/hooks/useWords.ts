import { useLayoutEffect } from 'react';
import { getAllWords } from '../methods/words';
import { parseWordFromServer } from '../utils/parseWordFromServer';
import { usePromise } from '../../hooks/usePromise';

export const useWords = (lang: string) => {
  const { isLoading, data, send } = usePromise(async () => {
    const result = await getAllWords(lang);
    console.log('prom', result);
    return result.map(parseWordFromServer);
  });

  // TODO: error

  useLayoutEffect(() => {
    send();
  }, [lang]);

  return { isLoading, data };
};

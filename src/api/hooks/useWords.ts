import { useLayoutEffect } from 'react';
import { getAllWords } from '../methods/words';
import { parseWordFromServer } from '../utils/parseWordFromServer';
import { usePromise } from '../../hooks/usePromise';
import { useCurrentLanguage } from '../../context/LanguageContext';

export const useWords = () => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, send } = usePromise(async () => {
    const result = await getAllWords(lang);
    return result.map(parseWordFromServer);
  }, true);

  // TODO: error

  useLayoutEffect(() => {
    send();
  }, [lang]);

  return { isLoading, data };
};

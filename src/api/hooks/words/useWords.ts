import { useLayoutEffect } from 'react';
import { getWords } from '../../methods/words';
import { usePromise } from '../../../hooks/usePromise';
import { useCurrentLanguage } from '../../../context/LanguageContext';

export const useWords = () => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, send } = usePromise(() => getWords(lang), true);

  useLayoutEffect(() => {
    send();
  }, [lang]);

  return { isLoading, data };
};

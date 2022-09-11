import { useCurrentLanguage } from '../../context/LanguageContext';
import { usePromise } from '../../kit/hooks';
import { useEffect, useLayoutEffect } from 'react';
import { getWords } from '../methods/words';
import { notifier } from '../../services/notifier';

export const useWords = (live = true) => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, send, sendSilent } = usePromise(() => getWords(lang));

  useLayoutEffect(() => {
    send();
  }, [lang]);

  useEffect(() => {
    if (!live) {
      return;
    }

    const listener = () => {
      sendSilent();
    };

    notifier.subscribe('words-update', listener);

    return () => {
      notifier.unsubscribe('words-update', listener);
    };
  }, [live]);

  return { isLoading, data };
};

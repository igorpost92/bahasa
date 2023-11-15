import { usePromise } from '../../kit';
import { useEffect, useLayoutEffect } from 'react';
import { getCategories } from '../methods/categories';
import { notifier } from '../../services/notifier';
import { useCurrentLanguage } from '../../context/LanguageContext';

export const useCategories = (live = true) => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, send, sendSilent } = usePromise(() => getCategories(lang));

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

    notifier.subscribe('categories-update', listener);

    return () => {
      notifier.unsubscribe('categories-update', listener);
    };
  }, [live, lang]);

  return { isLoading, data };
};

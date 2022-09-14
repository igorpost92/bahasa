import { useCurrentLanguage } from '../../context/LanguageContext';
import { usePromise } from '../../kit/hooks';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { getWords } from '../methods/words';
import { notifier } from '../../services/notifier';
import { WordListEntry } from '../types';

export const wordsSorts = [
  {
    value: 'date-desc' as const,
    name: 'Date (desc)',
    getField: (word: WordListEntry) => word.created_at.getTime(),
    sortK: -1,
  },
  {
    value: 'date-asc' as const,
    name: 'Date (asc)',
    getField: (word: WordListEntry) => word.created_at.getTime(),
  },
  {
    value: 'name-asc' as const,
    name: 'Name (asc)',
    getField: (word: WordListEntry) => word.text.toLowerCase(),
  },
  {
    value: 'name-desc' as const,
    name: 'Name (desc)',
    getField: (word: WordListEntry) => word.text.toLowerCase(),
    sortK: -1,
  },
  {
    value: 'step-desc' as const,
    name: 'Step (desc)',
    getField: (word: WordListEntry) => word.step ?? 0,
    sortK: -1,
  },
  {
    value: 'step-asc' as const,
    name: 'Step (asc)',
    getField: (word: WordListEntry) => word.step ?? 0,
  },
];

export type WordsSortTypes = typeof wordsSorts[number]['value'];

interface Params {
  live?: boolean;
  sort?: WordsSortTypes;
}

export const useWords = (params: Params = {}) => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, send, sendSilent } = usePromise(() => getWords(lang));

  useLayoutEffect(() => {
    send();
  }, [lang]);

  const live = params.live ?? false;

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
  }, [live, lang]);

  const { sort } = params;

  const sortedData = useMemo(() => {
    const words = data ?? [];

    if (!sort) {
      return words;
    }

    const sortRule = wordsSorts.find(item => item.value === sort);
    if (!sortRule) {
      return words;
    }

    return words.sort((a, b) => {
      const valueA = sortRule.getField(a);
      const valueB = sortRule.getField(b);

      let sortNumber = 0;
      if (valueA > valueB) {
        sortNumber = 1;
      } else if (valueB > valueA) {
        sortNumber = -1;
      }

      return sortNumber * (sortRule.sortK ?? 1);
    });
  }, [data, sort]);

  return { isLoading, data: sortedData };
};

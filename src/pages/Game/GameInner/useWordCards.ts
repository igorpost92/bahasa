import { useMemo } from 'react';
import { shuffle } from '../../../utils/shuffle';
import { calcNextRepeatTime } from '../../../constants/steps';
import { WordListEntry } from '../../../storage/types';

const isWordNeedToRepeat = (word: WordListEntry) => {
  if (!word.last_date) {
    return true;
  }

  const lastDate = word.last_date || word.created_at;
  const nextDate = calcNextRepeatTime(lastDate, word.step ?? 0);

  return new Date() >= nextDate;
};

export const useWordCards = (words: WordListEntry[], globalRepeatMode = false) => {
  const cards = useMemo(() => {
    if (globalRepeatMode) {
      return words.sort((a, b) => {
        const stepA = a.step ?? 0;
        const stepB = b.step ?? 0;
        return stepB - stepA;
      });
    }

    const wordsToRepeat = words.filter(isWordNeedToRepeat);
    return shuffle(wordsToRepeat);
  }, [words]);

  return cards;
};

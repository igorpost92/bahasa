import { Word } from '../../../types';
import { useMemo } from 'react';
import { shuffle } from '../../../utils/shuffle';
import { calcNextRepeatTime } from '../../../constants/steps';

const isWordNeedToRepeat = (word: Word) => {
  if (!word.last_date) {
  // TODO:
    return true
  }

  const lastDate = word.last_date || word.created_at;
  const nextDate = calcNextRepeatTime(lastDate, word.step ?? 0);

  return new Date() >= nextDate;
};

export const useWordCards = (words: Word[]) => {
  const cards = useMemo(() => {
    const wordsToRepeat = words.filter(isWordNeedToRepeat);
    return shuffle(wordsToRepeat);
  }, [words]);

  return cards;
};

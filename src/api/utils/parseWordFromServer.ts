import { Word } from '../../types';

type WordServer = Omit<Word, 'created_at' | 'last_date'> & {
  created_at: string;
  last_date: string | null;
};

export const parseWordFromServer = (wordRaw: WordServer) => {
  return {
    ...wordRaw,
    created_at: new Date(wordRaw.created_at),
    last_date: wordRaw.last_date ? new Date(wordRaw.last_date) : null,
  } as Word;
};

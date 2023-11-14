import { supabase } from '../sendRequest';
import { WordEntryDB } from '../../storage/db';

interface WordServerRaw extends Omit<WordEntryDB, 'created_at' | 'last_date'> {
  created_at: string;
  last_date: string | null;
}

const wordsTable = () => {
  return supabase().from<WordServerRaw>('words');
};

const parseWordFromServer = (wordRaw: WordServerRaw): WordEntryDB => {
  return {
    ...wordRaw,
    created_at: new Date(wordRaw.created_at),
    last_date: wordRaw.last_date ? new Date(wordRaw.last_date) : null,
  };
};

export const getWords = async () => {
  const { data, error } = await wordsTable().select('*');

  if (data) {
    return data.map(parseWordFromServer);
  }

  throw new Error(error.message ?? 'error getWords');
};

export const uploadWords = async (words: WordEntryDB[]) => {
  const res1 = await wordsTable().delete().not('id', 'is', null);
  if (res1.error) {
    alert(res1.error.message);
    throw res1.error;
  }

  // TODO: type
  const res2 = await wordsTable().insert(words as any);
  if (res2.error) {
    alert(res2.error.message);
    throw res2.error;
  }
};

import { supabase } from '../sendRequest';
import { getUser } from './auth';
import { WordTypes, WordUsageExample } from '../../storage/types';

interface WordServerRaw {
  id: string;
  text: string;
  meaning: string;
  type: WordTypes | null;
  lang: string;
  email: string;
  created_at: string;
  last_date: string | null;
  step: number | null;
  examples: WordUsageExample[] | null;
}

export interface WordServer extends Omit<WordServerRaw, 'created_at' | 'last_date'> {
  created_at: Date;
  last_date: Date | null;
}

const wordsTable = () => {
  return supabase.from<WordServerRaw>('words');
};

const parseWordFromServer = (wordRaw: WordServerRaw): WordServer => {
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

export const uploadWords = async (words: WordServer[]) => {
  const res1 = await wordsTable().delete().match({ email: getUser()?.email });
  if (res1.error) {
    alert(res1.error.message);
    throw res1.error;
  }

  debugger;

  // TODO: type
  const res2 = await wordsTable().insert(words as any);
  if (res2.error) {
    alert(res2.error.message);
    throw res2.error;
  }

  alert('ok');
};

import { supabase } from '../sendRequest';
import { getUser } from './auth';
import { FAKE_EMAIL } from '../../constants/fakeEmail';
import { WordTypes } from '../../types';

const wordsTable = () => {
  const email = supabase.auth.user()?.email;
  const useSecondaryTable = !email || email === FAKE_EMAIL;
  return supabase.from(useSecondaryTable ? 'words_2' : 'words');
};

// TODO: words interfaces

interface Word2 {
  id: string;
  text: string;
  meaning: string;
  type: WordTypes | null;
  created_at: string;
  last_date: string | null;
  step: number | null;
}

export const getAllWords = async (lang: string) => {
  const { data, error } = await wordsTable()
    .select('id, text, meaning, created_at, type, step, last_date')
    .match({ lang });

  if (data) {
    return data as Word2[];
  }

  throw new Error('error getAllWords');
};

export const getWord = (id: string) => {
  return wordsTable()
    .select('id, text, meaning, created_at, type, step, last_date')
    .eq('id', id)
    .single();
};

interface NewWord {
  text: string;
  meaning: string;
  type?: string;
  lang: string;
}

export const addWord = async (payload: NewWord) => {
  const { data, error } = await wordsTable().insert({
    text: payload.text.trim(),
    meaning: payload.meaning.trim(),
    lang: payload.lang,
    type: payload.type,
    email: getUser()?.email,
  });

  if (data) {
    return data;
  }

  throw new Error('error addWord');
};

export const bulkAdd = async (words: NewWord[]) => {
  const { data, error } = await wordsTable().insert(words);

  if (data) {
    return data;
  }

  throw new Error('error bulkAdd');
};

// bulkAdd([
//   { text: 'hola', meaning: 'привет', lang: 'ES' },
// ]);

interface UpdateWord {
  text: string;
  meaning: string;
  type?: string;
}

export const updateWord = async (id: string, payload: UpdateWord) => {
  const { data, error } = await wordsTable()
    .update({
      text: payload.text.trim(),
      meaning: payload.meaning.trim(),
      type: payload.type,
    })
    .match({ id });

  if (data) {
    return data;
  }

  throw new Error('error updateWord');
};

export const markWordAsRepeated = async (id: string, step: number) => {
  const { data, error } = await wordsTable()
    .update({
      last_date: new Date().toUTCString(),
      step,
    })
    .match({ id });

  if (data) {
    return data;
  }

  throw new Error('error markWordAsRepeated');
};

export const deleteWord = async (id: string) => {
  const { data, error } = await wordsTable().delete().match({ id });

  if (data) {
    return data;
  }

  throw new Error('error deleteWord');
};

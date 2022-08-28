import { supabase } from '../sendRequest';
import { getUser } from './auth';
import { FAKE_EMAIL } from '../../constants/fakeEmail';

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
  created_at: string;
  last_date: string | null;
  step: number | null;
}

export const getAllWords = async (lang: string) => {
  const { data, error } = await wordsTable()
    .select('id, text, meaning, created_at, step, last_date')
    .match({ lang });

  if (data) {
    return data as Word2[];
  }

  throw new Error('error getAllWords');
};

export const getWord = (id: string) => {
  return wordsTable()
    .select('id, text, meaning, created_at, step, last_date')
    .eq('id', id)
    .single();
};

export const addWord = async (text: string, meaning: string, lang: string) => {
  const { data, error } = await wordsTable().insert({
    text: text.trim(),
    meaning: meaning.trim(),
    lang,
    email: getUser()?.email,
  });

  if (data) {
    return data;
  }

  throw new Error('error addWord');
};

export const bulkAdd = async (words: { text: string; meaning: string; lang: string }[]) => {
  const { data, error } = await wordsTable().insert(words);

  if (data) {
    return data;
  }

  throw new Error('error bulkAdd');
};

// bulkAdd([
//   { text: 'hola', meaning: 'привет', lang: 'ES' },
// ]);

export const updateWord = async (id: string, text: string, meaning: string) => {
  const { data, error } = await wordsTable()
    .update({
      text: text.trim(),
      meaning: meaning.trim(),
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

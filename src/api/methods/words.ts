import { supabase } from '../sendRequest';
import { getUser } from './index';
import { Word, WordTypes } from '../../types';

interface WordServer extends Omit<Word, 'created_at' | 'last_date'> {
  created_at: string;
  last_date: string | null;
}

const wordsTable = () => {
  // const email = supabase.auth.user()?.email;
  // const useSecondaryTable = !email || email === FAKE_EMAIL;
  // return supabase.from(useSecondaryTable ? 'words_2' : 'words');
  return supabase.from<WordServer>('words');
};

const parseWordFromServer = (wordRaw: WordServer) => {
  return {
    ...wordRaw,
    created_at: new Date(wordRaw.created_at),
    last_date: wordRaw.last_date ? new Date(wordRaw.last_date) : null,
  } as Word;
};

// TODO: words interfaces

export const getWords = async (lang: string) => {
  const { data, error } = await wordsTable()
    .select('id, text, meaning, created_at, type, step, last_date')
    .match({ lang });

  if (data) {
    return data.map(parseWordFromServer);
  }

  throw new Error('error getWords');
};

export const getWord = async (id: number) => {
  const { data, error } = await wordsTable()
    .select('id, text, meaning, created_at, type, step, last_date')
    .eq('id', id)
    .single();

  if (data) {
    return parseWordFromServer(data);
  }

  throw new Error('error getWords');
};

interface NewWord {
  text: string;
  meaning: string;
  type?: WordTypes;
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
  type?: WordTypes;
}

export const updateWord = async (id: number, payload: UpdateWord) => {
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

export const markWordAsRepeated = async (id: number, step: number) => {
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

export const deleteWord = async (id: number) => {
  const { data, error } = await wordsTable().delete().match({ id });

  if (data) {
    return data;
  }

  throw new Error('error deleteWord');
};

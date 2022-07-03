import { supabase } from './sendRequest';

const wordsTable = () => supabase.from('words');

export const getAllWords = () => {
  return wordsTable().select('id, text, meaning, created_at, step, last_date');
};

export const getWord = (id: string) => {
  return wordsTable()
    .select('id, text, meaning, created_at, step, last_date')
    .eq('id', id)
    .single();
};

export const addWord = async (text: string, meaning: string) => {
  const { data, error } = await wordsTable().insert([{ text, meaning }]);

  if (data) {
    return data;
  }

  throw new Error('error addWord');
};

export const bulkAdd = async (words: {text: string, meaning: string}[]) => {
  const { data, error } = await wordsTable().insert(words);

  if (data) {
    return data;
  }

  throw new Error('error bulkAdd');
}

export const updateWord = async (id: string, text: string, meaning: string) => {
  const { data, error } = await wordsTable()
    .update({ text, meaning })
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
  const { data, error } = await wordsTable()
    .delete()
    .match({ id });

  if (data) {
    return data;
  }

  throw new Error('error deleteWord');
};

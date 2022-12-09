import { supabase } from '../sendRequest';
import { WordsInCategoriesDB } from '../../storage/db';

const table = () => supabase.from<WordsInCategoriesDB>('categories_words');

export const getCategoriesWords = async () => {
  const { data, error } = await table().select('*');

  if (data) {
    return data;
  }

  throw new Error(error.message ?? 'error getCategoriesWords');
};

export const uploadCategoriesWords = async (categoriesWords: WordsInCategoriesDB[]) => {
  // TODO: transaction
  // TODO: filter
  const deleteResult = await table().delete().not('word_id', 'is', null);

  if (deleteResult.error) {
    alert(deleteResult.error.message);
    throw deleteResult.error;
  }

  const insertResult = await table().insert(categoriesWords);
  if (insertResult.error) {
    alert(insertResult.error.message);
    throw insertResult.error;
  }
};

import { db } from '../../storage/db';
import { uploadWords as uploadWordsSupabase } from '../../api/methods/words';
import { uploadCategories as uploadCategoriesSupabase } from '../../api/methods/categories';
import { uploadCategoriesWords as uploadCategoriesWordsSupabase } from '../../api/methods/categoriesWords';
import { categoriesApi, categoriesWordsApi, syncsApi, wordsApi } from '../../api2';
import { camelCase, uniq } from 'lodash';

export const uploadToSupabase = async () => {
  const uploadWords = async () => {
    const words = await db.words.toArray();
    await uploadWordsSupabase(words);
  };

  const uploadCategories = async () => {
    const categories = await db.categories.toArray();
    await uploadCategoriesSupabase(categories);
  };

  const uploadCategoriesWords = async () => {
    const data = await db.categories_words.toArray();
    await uploadCategoriesWordsSupabase(data);
  };

  await Promise.all([
    //
    uploadWords(),
    uploadCategories(),
    uploadCategoriesWords(),
  ]);
};

export const uploadToNestHard = async () => {
  const uploadWords = async () => {
    const words = await db.words.toArray();
    await wordsApi.uploadWords(words);
  };

  const uploadCategories = async () => {
    const categories = await db.categories.toArray();
    await categoriesApi.uploadCategories(categories);
  };

  const uploadCategoriesWords = async () => {
    const data = await db.categories_words.toArray();
    await categoriesWordsApi.upload(data);
  };

  await Promise.all([
    //
    uploadWords(),
    uploadCategories(),
  ]);

  await uploadCategoriesWords();
};

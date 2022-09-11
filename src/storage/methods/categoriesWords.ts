import { db } from '../db';

export const getWordsByCategory = async (id: string) => {
  const res = await db.categories_words.where({ category_id: id }).toArray();
  return res.map(w => ({
    word_id: w.word_id,
  }));
};

export const setWordsForCategory = async (id: string, words: { word_id: string }[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    await db.categories_words.where({ category_id: id }).delete();

    if (words.length) {
      await db.categories_words.bulkAdd(
        words.map(word => ({
          category_id: id,
          word_id: word.word_id,
        })),
      );
    }
  });
};

export const getCategoriesByWord = async (id: string) => {
  const res = await db.categories_words.where({ word_id: id }).toArray();
  return res.map(w => ({
    category_id: w.category_id,
  }));
};

export const setCategoriesForWord = async (id: string, categories: { category_id: string }[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    await db.categories_words.where({ word_id: id }).delete();

    if (categories.length) {
      await db.categories_words.bulkAdd(
        categories.map(category => ({
          word_id: id,
          category_id: category.category_id,
        })),
      );
    }
  });
};

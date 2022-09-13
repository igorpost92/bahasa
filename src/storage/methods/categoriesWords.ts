import { db } from '../db';

export const getWordsByCategory = async (id: string) => {
  const res = await db.categories_words.where({ category_id: id }).sortBy('order_index');
  return res.map(w => ({
    word_id: w.word_id,
    order_index: w.order_index,
  }));
};

interface WordPayload {
  word_id: string;
  // TODO: remove undefined from everywhere ?
  order_index: number | undefined;
}

export const setWordsForCategory = async (id: string, words: WordPayload[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    await db.categories_words.where({ category_id: id }).delete();

    if (words.length) {
      await db.categories_words.bulkAdd(
        words.map(word => ({
          category_id: id,
          word_id: word.word_id,
          order_index: word.order_index || db.incrementCategoryOrderIndex(),
        })),
      );
    }
  });
};

export const getCategoriesByWord = async (id: string) => {
  const res = await db.categories_words.where({ word_id: id }).sortBy('order_index');
  return res.map(w => ({
    category_id: w.category_id,
    order_index: w.order_index,
  }));
};

interface CategoryPayload {
  category_id: string;
  order_index: number | undefined;
}

export const setCategoriesForWord = async (id: string, categories: CategoryPayload[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    await db.categories_words.where({ word_id: id }).delete();

    if (categories.length) {
      await db.categories_words.bulkAdd(
        categories.map(category => ({
          word_id: id,
          category_id: category.category_id,
          order_index: category.order_index || db.incrementCategoryOrderIndex(),
        })),
      );
    }
  });
};

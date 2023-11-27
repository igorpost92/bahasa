import { isEqual } from 'lodash';
import { db, WordsInCategoriesDB } from '../db';
import { isPredefinedCategory, predefinedCategoriesConfig } from './categories';
import { CategoryEntry } from '../types';
import { getCurrentLang } from '../currentLang';
import { v4 } from 'uuid';

export const getWordsIdsByCategory = async (id: string): Promise<CategoryEntry['words']> => {
  if (isPredefinedCategory(id)) {
    const lang = getCurrentLang();

    const words = await predefinedCategoriesConfig[id].getWords();

    return words
      .filter(item => item.lang === lang)
      .map(word => ({
        id: word.id,
        word_id: word.id,
        order_index: undefined,
      }));
  }

  const pairs = await db.categories_words.where({ category_id: id }).sortBy('order_index');
  return pairs.map(w => ({
    id: w.id,
    word_id: w.word_id,
    order_index: w.order_index,
  }));
};

export const getWordsIdsByCategories = async (
  categoriesIds: string[],
): Promise<CategoryEntry['words']> => {
  const byCategories = await Promise.all(categoriesIds.map(id => getWordsIdsByCategory(id)));
  return byCategories.flat();
};

interface WordPayload {
  id: string | undefined;
  word_id: string;
  order_index: number | undefined;
}

export const setWordsForCategory = async (id: string, words: WordPayload[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    const existingList = await db.categories_words.where({ category_id: id }).sortBy('order_index');

    const newList: WordsInCategoriesDB[] = words.map(word => ({
      id: word.id || v4(),
      category_id: id,
      word_id: word.word_id,
      order_index: word.order_index || db.incrementCategoryOrderIndex(),
    }));

    const changed = !isEqual(existingList, newList);
    if (!changed) {
      return;
    }

    await db.categories_words.where({ category_id: id }).delete();
    await db.categories_words.bulkAdd(newList);
  });
};

export const getCategoriesIdsByWord = async (id: string) => {
  const res = await db.categories_words.where({ word_id: id }).sortBy('order_index');
  return res.map(w => ({
    id: w.id,
    category_id: w.category_id,
    order_index: w.order_index,
  }));
};

interface CategoryPayload {
  id: string | undefined;
  category_id: string;
  order_index: number | undefined;
}

export const setCategoriesForWord = async (id: string, categories: CategoryPayload[]) => {
  await db.transaction('rw', db.categories_words, async () => {
    const existingList = await db.categories_words.where({ word_id: id }).sortBy('order_index');

    const newList: WordsInCategoriesDB[] = categories.map(category => ({
      id: category.id || v4(),
      word_id: id,
      category_id: category.category_id,
      order_index: category.order_index || db.incrementCategoryOrderIndex(),
    }));

    const changed = !isEqual(existingList, newList);
    if (!changed) {
      return;
    }

    await db.categories_words.where({ word_id: id }).delete();
    await db.categories_words.bulkAdd(newList);
  });
};

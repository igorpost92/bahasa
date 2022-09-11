import { v4 } from 'uuid';
import { db } from '../db';
import { getWordsByCategory, setWordsForCategory } from './categoriesWords';
import { CategoryListEntry } from '../types';

export const getCategories = async () => {
  const categories = await db.categories.toArray();

  return Promise.all(
    categories.map(async category => {
      const words = await getWordsByCategory(category.id);

      return { ...category, length: words.length } as CategoryListEntry;
    }),
  );
};

export const getCategory = async (id: string) => {
  const category = await db.categories.get(id);

  if (!category) {
    throw new Error(`No category found with id: ${id}`);
  }

  const words = await getWordsByCategory(category.id);
  return { ...category, words };
};

interface UpsertCategoryPayload {
  name: string;
  words: { word_id: string }[];
}

export const createCategory = async (payload: UpsertCategoryPayload) => {
  await db.transaction('rw', db.categories, db.categories_words, async () => {
    const id = await db.categories.add({
      id: v4(),
      name: payload.name,
    });

    await setWordsForCategory(id, payload.words);
  });
};

export const updateCategory = async (id: string, payload: UpsertCategoryPayload) => {
  await db.transaction('rw', db.categories, db.categories_words, async () => {
    await db.categories.update(id, {
      name: payload.name,
    });

    await setWordsForCategory(id, payload.words);
  });
};

export const deleteCategory = async (id: string) => {
  await db.transaction('rw', db.categories, db.categories_words, async () => {
    await db.categories.delete(id);
    await setWordsForCategory(id, []);
  });
};

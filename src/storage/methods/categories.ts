import { v4 } from 'uuid';
import { db, WordEntryDB } from '../db';
import { getWordsIdsByCategory, setWordsForCategory } from './categoriesWords';
import { CategoryEntry, CategoryListEntry, WordTypes } from '../types';

interface PredefinedCategoryConfig {
  id: string;
  name: string;
  predefined: true;
  getWords: () => Promise<WordEntryDB[]>;
}

export const predefinedCategoriesConfig: Record<string, PredefinedCategoryConfig> = {
  1: {
    id: '1',
    name: 'Verbs',
    predefined: true,
    getWords: () => db.words.filter(item => item.type === WordTypes.Verb).toArray(),
  },
  2: {
    id: '2',
    name: 'Adjectives',
    predefined: true,
    getWords: () => db.words.filter(item => item.type === WordTypes.Adjective).toArray(),
  },
};

export const isPredefinedCategory = (id: string) => {
  return Boolean(predefinedCategoriesConfig[id]);
};

const getPredefinedCategory = (id: string) => {
  const { name } = predefinedCategoriesConfig[id];

  return {
    id,
    name,
    predefined: true,
  };
};

export const getCategories = async (): Promise<CategoryListEntry[]> => {
  const predefined = Object.keys(predefinedCategoriesConfig).map(getPredefinedCategory);

  const userCategories = await db.categories.toArray();

  const categories = [...predefined, ...userCategories];

  return Promise.all(
    categories.map(async category => {
      const words = await getWordsIdsByCategory(category.id);
      return { ...category, length: words.length };
    }),
  );
};

export const getCategory = async (id: string): Promise<CategoryEntry> => {
  let category;

  if (isPredefinedCategory(id)) {
    category = getPredefinedCategory(id);
  } else {
    category = await db.categories.get(id);
  }

  if (!category) {
    throw new Error(`No category found with id: ${id}`);
  }

  const words = await getWordsIdsByCategory(category.id);
  return { ...category, words };
};

interface UpsertCategoryPayload {
  name: string;
  words: {
    word_id: string;
    order_index: number | undefined;
  }[];
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
  if (isPredefinedCategory(id)) {
    return;
  }

  await db.transaction('rw', db.categories, db.categories_words, async () => {
    await db.categories.update(id, {
      name: payload.name,
    });

    await setWordsForCategory(id, payload.words);
  });
};

export const deleteCategory = async (id: string) => {
  if (isPredefinedCategory(id)) {
    return;
  }

  await db.transaction('rw', db.categories, db.categories_words, async () => {
    await db.categories.delete(id);
    await setWordsForCategory(id, []);
  });
};

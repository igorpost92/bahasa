import { v4 } from 'uuid';
import { db, WordEntryDB } from '../db';
import { getWordsIdsByCategory, setWordsForCategory } from './categoriesWords';
import { CategoryEntry, CategoryListEntry, WordTypes } from '../types';
import { notifier } from '../../services/notifier';

interface PredefinedCategoryConfig {
  id: string;
  name: string;
  predefined: true;
  getWords: () => Promise<WordEntryDB[]>;
}

const getWordsForPredefinedCategory = (type: WordTypes) =>
  db.words
    .filter(item => item.type === type)
    .reverse()
    .sortBy('created_at');

export const predefinedCategoriesConfig: Record<string, PredefinedCategoryConfig> = {
  1: {
    id: '1',
    name: 'Verbs',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Verb),
  },
  2: {
    id: '2',
    name: 'Adjectives',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Adjective),
  },
  3: {
    id: '3',
    name: 'Nouns',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Noun),
  },
  4: {
    id: '4',
    name: 'Adverbs',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Adverb),
  },
  5: {
    id: '5',
    name: 'Prepositions',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Preposition),
  },
  6: {
    id: '6',
    name: 'Pronouns',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Pronoun),
  },
  7: {
    id: '7',
    name: 'Phrases',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Phrase),
  },
  8: {
    id: '8',
    name: 'Idioms',
    predefined: true,
    getWords: () => getWordsForPredefinedCategory(WordTypes.Idiom),
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

export const getCategories = async (lang: string): Promise<CategoryListEntry[]> => {
  const predefined = Object.keys(predefinedCategoriesConfig).map(getPredefinedCategory);

  const userCategories = await db.categories.where({ lang }).toArray();

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

interface CreateCategoryPayload extends UpdateCategoryPayload {
  lang: string;
}

interface UpdateCategoryPayload {
  name: string;
  words: {
    id: string | undefined;
    word_id: string;
    order_index: number | undefined;
  }[];
}

export const createCategory = async (payload: CreateCategoryPayload) => {
  await db.transaction('rw', db.categories, db.categories_words, db.sync, async () => {
    const id = await db.categories.add({
      id: v4(),
      name: payload.name,
      lang: payload.lang,
    });

    await setWordsForCategory(id, payload.words);
  });

  notifier.notify('categories-update');
};

export const updateCategory = async (id: string, payload: UpdateCategoryPayload) => {
  if (isPredefinedCategory(id)) {
    return;
  }

  await db.transaction('rw', db.categories, db.categories_words, db.sync, async () => {
    await db.categories.update(id, {
      name: payload.name,
    });

    await setWordsForCategory(id, payload.words);
  });

  notifier.notify('categories-update');
};

export const deleteCategory = async (id: string) => {
  if (isPredefinedCategory(id)) {
    return;
  }

  await db.transaction('rw', db.categories, db.categories_words, db.sync, async () => {
    await db.categories.delete(id);
    await setWordsForCategory(id, []);
  });

  notifier.notify('categories-update');
};

import { db } from '../db';
import { getCategoriesByWord, setCategoriesForWord } from './categoriesWords';
import { notifier } from '../../services/notifier';
import { v4 } from 'uuid';
import { WordEntry, WordListEntry, WordTypes, WordUsageExample } from '../types';

export const getWords = async (lang: string): Promise<WordListEntry[]> => {
  const words = await db.words.where({ lang }).toArray();

  return words.map(word => ({
    id: word.id,
    text: word.text,
    meaning: word.meaning,
    step: word.step,
    type: word.type,
    last_date: word.last_date,
    created_at: word.created_at,
  }));
};

export const getWord = async (id: string): Promise<WordEntry> => {
  const word = await db.words.get(id);

  if (!word) {
    throw new Error(`No word found with id: ${id}`);
  }

  const categories = await getCategoriesByWord(id);
  return { ...word, categories };
};

interface CreateWordPayload extends UpdateWordPayload {
  lang: string;
}

export const createWord = async (payload: CreateWordPayload) => {
  let newId!: string;

  await db.transaction('rw', db.words, db.categories_words, async () => {
    const id = await db.words.add({
      id: v4(),
      text: payload.text.trim(),
      meaning: payload.meaning.trim(),
      created_at: new Date(),
      type: payload.type,
      step: null,
      last_date: null,
      lang: payload.lang,
      examples: payload.examples,
    });

    await setCategoriesForWord(id, payload.categories);

    // TODO: why need? if need, use in other places
    newId = id;
  });

  notifier.notify('words-update');
  return { id: newId };
};

interface UpdateWordPayload {
  text: string;
  meaning: string;
  type: WordTypes | null;
  examples: WordUsageExample[] | null;
  categories: { category_id: string }[];
}

export const updateWord = async (id: string, payload: UpdateWordPayload) => {
  await db.transaction('rw', db.words, db.categories_words, async () => {
    await db.words.update(id, {
      text: payload.text.trim(),
      meaning: payload.meaning.trim(),
    });

    await setCategoriesForWord(id, payload.categories);
  });

  notifier.notify('words-update');
};

export const deleteWord = async (id: string) => {
  await db.transaction('rw', db.words, db.categories_words, async () => {
    await db.words.delete(id);
    await setCategoriesForWord(id, []);
  });

  notifier.notify('words-update');
};

export const markWordAsRepeated = async (id: string, step: number) => {
  await db.words.update(id, {
    step,
    last_date: new Date(),
  });
};

import { CategoryEntryDB, db, WordEntryDB, WordsInCategoriesDB } from '../../storage/db';
import { getWords } from '../../api/methods/words';
import { getCategories } from '../../api/methods/categories';
import { getCategoriesWords } from '../../api/methods/categoriesWords';
import { categoriesApi, categoriesWordsApi, wordsApi } from '../../api2';

const saveWords = async (words: WordEntryDB[]) => {
  await db.transaction('rw', db.words, async tx => {
    // TODO:
    (tx as any).__sync__ = true;

    await db.words.clear();

    await db.words.bulkAdd(
      words.map(item => {
        return {
          id: item.id,
          text: item.text,
          meaning: item.meaning,
          type: item.type,
          created_at: item.created_at,
          last_date: item.last_date,
          step: item.step,
          lang: item.lang,
          examples: item.examples,
        };
      }),
    );
  });
};

const saveCategories = async (categories: CategoryEntryDB[]) => {
  await db.transaction('rw', db.categories, async tx => {
    (tx as any).__sync__ = true;
    await db.categories.clear();
    await db.categories.bulkAdd(categories);
  });
};

const saveCategoriesWords = async (data: WordsInCategoriesDB[]) => {
  await db.transaction('rw', db.categories_words, async tx => {
    (tx as any).__sync__ = true;
    await db.categories_words.clear();
    await db.categories_words.bulkAdd(data);
  });
};

export const downloadFromSupabase = async () => {
  const [words, categories, categoriesWords] = await Promise.all([
    getWords(),
    getCategories(),
    getCategoriesWords(),
  ]);

  console.log({
    words,
    categories,
    categoriesWords,
  });

  await db.transaction('rw', db.words, db.categories, db.categories_words, async () => {
    await Promise.all([
      //
      saveWords(words),
      saveCategories(categories),
      saveCategoriesWords(categoriesWords),
    ]);
  });
};

export const downloadFromNest = async () => {
  const [words, categories, categoriesWords] = await Promise.all([
    wordsApi.getAllWords(),
    categoriesApi.getAllCategories(),
    categoriesWordsApi.getAll(),
  ]);

  console.log({
    words,
    categories,
    categoriesWords,
  });

  await db.transaction('rw', db.words, db.categories, db.categories_words, async () => {
    await Promise.all([
      //
      saveWords(words),
      saveCategories(categories),
      saveCategoriesWords(categoriesWords),
    ]);
  });
};

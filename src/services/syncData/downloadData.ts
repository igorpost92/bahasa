import { CategoryEntryDB, db, WordEntryDB, WordsInCategoriesDB } from '../../storage/db';
import { getWords } from '../../api/methods/words';
import { getCategories } from '../../api/methods/categories';
import { getCategoriesWords } from '../../api/methods/categoriesWords';

const saveWords = async (words: WordEntryDB[]) => {
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
};

const saveCategories = async (categories: CategoryEntryDB[]) => {
  await db.categories.clear();
  await db.categories.bulkAdd(categories);
};

const saveCategoriesWords = async (data: WordsInCategoriesDB[]) => {
  await db.categories_words.clear();
  await db.categories_words.bulkAdd(data);
};

export const downloadWordsData = async () => {
  const [
    //
    words,
    categories,
    categoriesWords,
  ] = await Promise.all([
    //
    getWords(),
    getCategories(),
    getCategoriesWords(),
  ]);

  await db.transaction('rw', db.words, db.categories, db.categories_words, async () => {
    await Promise.all([
      //
      saveWords(words),
      saveCategories(categories),
      saveCategoriesWords(categoriesWords),
    ]);
  });
};

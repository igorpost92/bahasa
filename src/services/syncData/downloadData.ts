import { db } from '../../storage/db';
import { getWords } from '../../api/methods/words';
import { getCategories } from '../../api/methods/categories';
import { getCategoriesWords } from '../../api/methods/categoriesWords';

const downloadWords = async () => {
  await db.words.clear();

  const serverWords = await getWords();
  await db.words.bulkAdd(
    serverWords.map(item => {
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

const downloadCategories = async () => {
  await db.categories.clear();

  const serverData = await getCategories();
  await db.categories.bulkAdd(serverData);
};

const downloadCategoriesWords = async () => {
  await db.categories_words.clear();

  const serverData = await getCategoriesWords();
  await db.categories_words.bulkAdd(serverData);
};

export const downloadWordsData = async () => {
  await db.transaction('rw', db.words, db.categories, db.categories_words, async () => {
    await Promise.all([
      //
      downloadWords(),
      downloadCategories(),
      downloadCategoriesWords(),
    ]);
  });
};

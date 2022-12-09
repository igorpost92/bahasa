import { db } from '../../storage/db';
import { uploadWords as uploadWordsServer, WordServer } from '../../api/methods/words';
import { uploadCategories as uploadCategoriesServer } from '../../api/methods/categories';
import { uploadCategoriesWords as uploadCategoriesWordsServer } from '../../api/methods/categoriesWords';

const uploadWords = async (email: string) => {
  const words = await db.words.toArray();
  const serverWords: WordServer[] = words.map(w => ({
    ...w,
    email,
  }));

  await uploadWordsServer(serverWords);
};

const uploadCategories = async () => {
  const categories = await db.categories.toArray();
  await uploadCategoriesServer(categories);
};

const uploadCategoriesWords = async () => {
  const categoriesWords = await db.categories_words.toArray();
  await uploadCategoriesWordsServer(categoriesWords);
};

export const uploadWordsData = async (email: string) => {
  await Promise.all([
    //
    uploadWords(email),
    uploadCategories(),
    uploadCategoriesWords(),
  ]);
};

import { db } from '../../storage/db';
import { uploadWords as uploadWordsServer } from '../../api/methods/words';
import { uploadCategories as uploadCategoriesServer } from '../../api/methods/categories';
import { uploadCategoriesWords as uploadCategoriesWordsServer } from '../../api/methods/categoriesWords';

const uploadWords = async () => {
  const words = await db.words.toArray();
  // TODO: different types
  await uploadWordsServer(words);
};

const uploadCategories = async () => {
  const categories = await db.categories.toArray();
  await uploadCategoriesServer(categories);
};

const uploadCategoriesWords = async () => {
  const categoriesWords = await db.categories_words.toArray();
  await uploadCategoriesWordsServer(categoriesWords);
};

export const uploadWordsData = async () => {
  await Promise.all([
    //
    uploadWords(),
    uploadCategories(),
    uploadCategoriesWords(),
  ]);
};

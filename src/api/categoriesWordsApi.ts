import { WordsInCategoriesDB } from '../storage/db';
import { createMainApiInstance } from './mainApiInstance';
import { camelCase } from 'lodash';

// TODO: refacto cases
const parseFromServer = (raw: WordsInCategoriesDB): WordsInCategoriesDB => {
  const { wordId, orderIndex, categoryId, ...restData } = raw as any;
  return {
    ...restData,
    word_id: wordId,
    category_id: categoryId,
    order_index: orderIndex,
  };
};

const parseForNest = (data: any) => {
  const result: any = {};

  Object.entries(data).forEach(([key, value]) => {
    const keyCorrected = camelCase(key);
    result[keyCorrected] = value;
  });

  return result;
};

class CategoriesWordsApi {
  instance = createMainApiInstance('categories-words');

  async getAll() {
    const response = await this.instance.get<WordsInCategoriesDB[]>('');
    return response.data.map(parseFromServer);
  }

  async upload(data: WordsInCategoriesDB[]) {
    await this.instance.put('bulk', data.map(parseForNest));
  }
}

export const categoriesWordsApi = new CategoriesWordsApi();

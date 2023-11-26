import { CategoryEntryDB } from '../storage/db';
import { createMainApiInstance } from './mainApiInstance';

class CategoriesApi {
  instance = createMainApiInstance('categories');

  async getAllCategories() {
    const response = await this.instance.get<CategoryEntryDB[]>('');
    return response.data;
  }

  // async getCategory(id: string) {
  //   const response = await this.instance.get<CategoryEntryDB>(id);
  //   return response.data;
  // }
  //
  // createCategory(categoryDto: CategoryEntryDB) {
  //   return this.instance.post('', categoryDto);
  // }

  async uploadCategories(categories: CategoryEntryDB[]) {
    await this.instance.put('bulk', categories);
  }
}

export const categoriesApi = new CategoriesApi();

import Dexie, { Table } from 'dexie';
import { WordTypes, WordUsageExample } from './types';

export interface WordEntryDB {
  id: string;
  created_at: Date;
  text: string;
  meaning: string;
  type: WordTypes | null;
  lang: string;
  last_date: Date | null;
  step: number | null;
  examples: WordUsageExample[] | null;
}

export interface CategoryEntryDB {
  id: string;
  name: string;
}

export interface WordsInCategoriesDB {
  word_id: string;
  category_id: string;
  order_index: number;
}

class DB extends Dexie {
  words!: Table<WordEntryDB, string>;
  categories!: Table<CategoryEntryDB, string>;

  categories_words!: Table<WordsInCategoriesDB>;
  categoriesOrderIndex: number = 0;

  constructor() {
    super('espahasa-database');
    this.version(1).stores({
      words: 'id,lang',
      categories: 'id',
      categories_words: '[category_id+word_id],category_id,word_id',
    });
  }

  initCategoriesOrderIndex = async () => {
    const res = await this.categories_words.toCollection().sortBy('order_index');
    const last = res.filter(item => !!item.order_index).at(-1)?.order_index ?? 0;

    this.categoriesOrderIndex = last;
  };

  incrementCategoryOrderIndex = () => {
    this.categoriesOrderIndex += 1;
    return this.categoriesOrderIndex;
  };
}

const initDB = () => {
  const db = new DB();
  db.initCategoriesOrderIndex();
  return db;
};

export const db = initDB();

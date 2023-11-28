import Dexie, { Table } from 'dexie';
import { TenseData, WordTypes, WordUsageExample } from './types';

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
  lang: string;
}

// TODO: name
export interface WordsInCategoriesDB {
  id: string;
  word_id: string;
  category_id: string;
  order_index: number;
}

export interface VerbEntryDB {
  word_id: string;
  data: TenseData;
}

class DB extends Dexie {
  words!: Table<WordEntryDB, string>;
  categories!: Table<CategoryEntryDB, string>;
  verbs!: Table<VerbEntryDB, string>;

  categories_words!: Table<WordsInCategoriesDB>;
  categoriesOrderIndex: number = 0;

  constructor() {
    super('espahasa-database');
    this.version(1).stores({
      words: 'id,lang',
      categories: 'id',
      categories_words: '[category_id+word_id],category_id,word_id',
    });

    this.version(2).stores({
      verbs: 'word_id',
    });

    this.version(3).stores({
      categories: 'id,lang',
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

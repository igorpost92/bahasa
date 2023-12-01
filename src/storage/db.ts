import Dexie, { Table } from 'dexie';
import { TenseData, WordTypes, WordUsageExample } from './types';
import { registerSync } from './sync';

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

export interface SyncEntryDB {
  id: string;
  // TODO: make use of date
  createdAt: Date;
  messageId: number;
  entryType: string;
  entryId: string;
  value: object | null;
}

class DB extends Dexie {
  words!: Table<WordEntryDB, string>;
  categories!: Table<CategoryEntryDB, string>;
  verbs!: Table<VerbEntryDB, string>;

  categories_words!: Table<WordsInCategoriesDB>;
  categoriesOrderIndex: number = 0;

  sync!: Table<SyncEntryDB, string>;

  constructor() {
    super('espahasa-database');
    this.version(1).stores({
      words: 'id,lang',
      categories: 'id,lang',
      categories_words: 'id,&[category_id+word_id],category_id,word_id',
      verbs: 'word_id',
    });

    this.version(2).stores({
      sync: '[messageId+entryType+entryId],messageId',
      // TODO: table for messageId
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

// TODO: promised
const initDB = () => {
  const db = new DB();
  db.initCategoriesOrderIndex();
  registerSync([db.words, db.categories, db.categories_words]);

  return db;
};

export const db = initDB();

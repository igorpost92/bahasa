import Dexie, { Table } from 'dexie';
import { getWords } from '../api/methods/words';
import { WordTypes, WordUsageExample } from './types';

interface WordEntryDB {
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

interface CategoryEntryDB {
  id: string;
  name: string;
}

interface WordsInCategoriesDB {
  word_id: string;
  category_id: string;
}

class DB extends Dexie {
  words!: Table<WordEntryDB, string>;
  categories!: Table<CategoryEntryDB, string>;
  categories_words!: Table<WordsInCategoriesDB>;

  constructor() {
    super('espahasa-database');
    this.version(1).stores({
      words: 'id,lang',
      categories: 'id',
      categories_words: '[category_id+word_id],category_id,word_id',
    });
  }
}

export const db = new DB();

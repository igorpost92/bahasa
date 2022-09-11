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

class DB extends Dexie {
  words!: Table<WordEntryDB, string>;

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

export interface WordListEntry {
  id: string;
  text: string;
  meaning: string;
  type: WordTypes | null;
  created_at: Date;
  last_date: Date | null;
  step: number | null;
}

export interface WordEntry {
  id: string;
  text: string;
  meaning: string;
  type: WordTypes | null;
  last_date: Date | null;
  step: number | null;
  examples: WordUsageExample[] | null;
  categories: {
    category_id: string;
    order_index: number | undefined;
  }[];
}

export interface WordUsageExample {
  text: string;
  meaning: string;
}

export enum WordTypes {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Phrase = 'phrase',
}

export interface CategoryListEntry {
  id: string;
  name: string;
  predefined?: boolean;
  length: number;
}

export interface CategoryEntry {
  id: string;
  name: string;
  predefined?: boolean;
  words: {
    word_id: string;
    order_index: number | undefined;
  }[];
}

export interface VerbEntryData {
  word_id: string;
  name: string;
  data: TenseData;
}

type TenseData = Record<string, string[] | undefined>;

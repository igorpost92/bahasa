export interface WordEntry {
  id: number;
  text: string;
  meaning: string;
  type: WordTypes | null;
  created_at: Date;
  last_date: Date | null;
  step: number | null;
  examples: WordUsageExample[] | null;
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

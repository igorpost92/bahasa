export interface Word {
  id: number;
  text: string;
  meaning: string;
  type: WordTypes | null;
  created_at: Date;
  last_date: Date | null;
  step: number | null;
}

export enum WordTypes {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Phrase = 'phrase',
}

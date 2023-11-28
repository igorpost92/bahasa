import { WordEntryDB } from '../storage/db';
import { createMainApiInstance } from './mainApiInstance';
import { camelCase } from 'lodash';

interface WordServerRaw extends Omit<WordEntryDB, 'created_at' | 'last_date'> {
  created_at: string;
  last_date: string | null;
}

// TODO: refacto cases
const parseFromServer = (wordRaw: WordServerRaw): WordEntryDB => {
  const { createdAt, lastDate, ...restData } = wordRaw as any;
  return {
    ...restData,
    created_at: new Date(createdAt),
    last_date: lastDate ? new Date(lastDate) : null,
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

class WordsApi {
  instance = createMainApiInstance('words');

  async getAllWords() {
    const response = await this.instance.get<WordServerRaw[]>('');
    return response.data.map(parseFromServer);
  }

  async uploadWords(words: WordEntryDB[]) {
    await this.instance.put('bulk', words.map(parseForNest));
  }
}

export const wordsApi = new WordsApi();

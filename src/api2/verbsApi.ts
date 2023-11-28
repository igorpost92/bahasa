import { createMainApiInstance } from './mainApiInstance';
import { VerbEntryDB } from '../storage/db';

// TODO: refacto cases
const parseFromServer = (raw: VerbEntryDB): VerbEntryDB => {
  const { wordId, ...restData } = raw as any;
  return {
    ...restData,
    word_id: wordId,
  };
};

class VerbsApi {
  instance = createMainApiInstance('verbs');

  async getAllVerbs() {
    const verbs = await this.instance.get<VerbEntryDB[]>('');
    return verbs.data.map(parseFromServer);
  }

  async updateVerbsOnServer() {
    await this.instance.post('');
  }
}

export const verbsApi = new VerbsApi();

import { createMainApiInstance } from './mainApiInstance';
import { VerbEntryDB } from '../storage/db';

class VerbsApi {
  instance = createMainApiInstance('verbs');

  async getAllVerbs() {
    const verbs = await this.instance.get<VerbEntryDB[]>('');
    return verbs.data;
  }

  async updateVerbsOnServer() {
    await this.instance.post('');
  }
}

export const verbsApi = new VerbsApi();

import { createMainApiInstance } from './mainApiInstance';

class SyncApi {
  instance = createMainApiInstance('sync');

  async createEnvelope() {
    const response = await this.instance.post<string>('envelope');
    return response.data;
  }

  // TODO: type
  async uploadData(envelopeId: string, data: any) {
    await this.instance.put(`envelope/${envelopeId}`, data);
  }

  async syncData(envelopeId: string) {
    await this.instance.post(`envelope/${envelopeId}/sync`);
  }
}

export const syncsApi = new SyncApi();

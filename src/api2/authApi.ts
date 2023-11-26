import { LocalStorageTokens } from '../constants/localStorageTokens';
import { createMainApiInstance } from './mainApiInstance';

class AuthApi {
  instance = createMainApiInstance('users');

  async signIn(name: string, password: string) {
    const response = await this.instance.post('sessions', { name, password });
    const { sessionId } = response.data;
    if (!sessionId) {
      throw new Error('SessionID is not found');
    }

    localStorage.setItem(LocalStorageTokens.SessionID, sessionId);
  }
}

export const authApi = new AuthApi();

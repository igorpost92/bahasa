import axios, { CreateAxiosDefaults } from 'axios';
import { LocalStorageTokens } from '../constants/localStorageTokens';
import { envVariables } from '../constants/envVariables';

export const createMainApiInstance = (baseUrl: string, config?: CreateAxiosDefaults) => {
  const sanitizedUrl = baseUrl.replace(/^\//, '');

  const instance = axios.create({
    ...config,
    baseURL: `${envVariables.mainApiUrl}/${sanitizedUrl}`,
  });

  instance.interceptors.request.use(config => {
    const sessionId = localStorage.getItem(LocalStorageTokens.SessionID);

    if (sessionId) {
      config.headers.set('session-id', sessionId);
    }

    return config;
  });

  return instance;
};

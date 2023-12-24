import { LocalStorageTokens } from '../constants/localStorageTokens';

export const getCurrentLang = () => {
  return localStorage.getItem(LocalStorageTokens.CurrentLang) ?? 'ES';
};

export const setCurrentLang = (lang: string) => {
  localStorage.setItem(LocalStorageTokens.CurrentLang, lang);
};

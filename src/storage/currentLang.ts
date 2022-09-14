const CURRENT_LANG_TOKEN = 'current-lang-code';

export const getCurrentLang = () => {
  return localStorage.getItem(CURRENT_LANG_TOKEN) ?? 'ES';
};

export const setCurrentLang = (lang: string) => {
  localStorage.setItem(CURRENT_LANG_TOKEN, lang);
};

import { supabase } from '../sendRequest';

const languagesTable = () => supabase.from<Language>('languages');

interface Language {
  code: string;
  name: string;
}

export const getLanguages = async () => {
  const { data, error } = await languagesTable().select('code, name');

  if (data) {
    return data;
  }

  throw new Error('error getLanguages');
};

export const getLanguage = async (code: string) => {
  const { data, error } = await languagesTable().select('code, name').match({ code }).single();

  if (data) {
    return data;
  }

  throw new Error('error getLanguage');
};

export const addLanguage = async (code: string, name: string) => {
  const { data, error } = await languagesTable().insert({
    code: code.trim(),
    name: name.trim(),
  });

  if (data) {
    return data;
  }

  throw new Error('error addLanguage');
};

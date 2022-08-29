import { supabase } from '../sendRequest';

const verbsTable = () => {
  return supabase.from('verbs');
};

export interface VerbData {
  word_id: string;
  name: string;
  data: TenseData;
}

type TenseData = Record<string, string[]>;

export const getAllVerbs = async () => {
  const { data, error } = await verbsTable().select('word_id, name, data');

  if (data) {
    return data.map(item => ({ ...item, data: JSON.parse(item.data) })) as VerbData[];
  }

  throw new Error('error getAllWords');
};

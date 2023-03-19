import { supabase } from '../sendRequest';
import { VerbEntryData } from '../../storage/types';

const verbsTable = () => {
  return supabase().from('verbs');
};

export const getAllVerbs = async () => {
  const { data, error } = await verbsTable().select('word_id, name, data');

  if (data) {
    return data.map(item => ({ ...item, data: JSON.parse(item.data) })) as VerbEntryData[];
  }

  throw new Error('error getAllWords');
};

import { supabase } from '../sendRequest';
import { VerbEntryData } from '../../storage/types';

const verbsTable = () => {
  return supabase().from<VerbEntryData>('verbs');
};

export const getAllVerbs = async () => {
  const { data, error } = await verbsTable().select('word_id, name, data');

  if (data) {
    return data.map(item => {
      // TODO: refacto
      const dataItem = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      return { ...item, data: dataItem };
    }) as VerbEntryData[];
  }

  throw new Error('error getAllWords');
};

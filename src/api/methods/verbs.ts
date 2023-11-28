import { supabase } from '../sendRequest';
import { VerbEntryDB } from '../../storage/db';

const verbsTable = () => {
  return supabase().from<VerbEntryDB>('verbs');
};

export const getAllVerbs = async () => {
  const { data, error } = await verbsTable().select('word_id, data');

  if (data) {
    return data.map(item => {
      // TODO: refacto
      const dataItem = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      return { ...item, data: dataItem };
    }) as VerbEntryDB[];
  }

  throw new Error('error getAllWords');
};

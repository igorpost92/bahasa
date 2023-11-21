import { db } from '../db';
import { VerbEntryData } from '../types';

export const getVerbs = async () => {
  const verbsList = await db.verbs.toArray();

  const data = await Promise.all(
    verbsList.map(async item => {
      const word = await db.words.get(item.word_id);

      const verbFormData: VerbEntryData = {
        ...item,
        meaning: word?.meaning ?? '',
      };

      return verbFormData;
    }),
  );

  return data;
};

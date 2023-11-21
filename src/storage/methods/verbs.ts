import { db } from '../db';
import { VerbEntryData, WordTypes } from '../types';

export const getVerbs = async () => {
  const verbWords = await db.words
    .toCollection()
    .filter(item => item.type === WordTypes.Verb && item.lang === 'ES')
    .toArray();

  const data = await Promise.all(
    verbWords.map(async item => {
      const verb = await db.verbs.get(item.id);

      const verbFormData: VerbEntryData = {
        word_id: item.id,
        name: item.text,
        meaning: item.meaning,
        data: verb?.data ?? {},
      };

      return verbFormData;
    }),
  );

  return data;
};

import { db } from '../../storage/db';
import { getAllVerbs } from '../../api/methods/verbs';

export const downloadVerbsData = async () => {
  await db.verbs.clear();
  const serverVerbs = await getAllVerbs();

  await db.verbs.bulkAdd(
    serverVerbs.map(item => {
      return {
        word_id: item.word_id,
        name: item.name,
        data: item.data,
      };
    }),
  );
};

import { db } from '../../storage/db';
import { verbsApi } from '../../api2';

export const downloadVerbsData = async () => {
  await verbsApi.updateVerbsOnServer();
  const serverVerbs = await verbsApi.getAllVerbs();

  await db.transaction('rw', db.verbs, async () => {
    await db.verbs.clear();

    await db.verbs.bulkAdd(
      serverVerbs.map(item => {
        return {
          word_id: item.word_id,
          name: item.name,
          data: item.data,
        };
      }),
    );
  });
};

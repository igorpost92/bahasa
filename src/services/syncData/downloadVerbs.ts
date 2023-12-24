import { db } from '../../storage/db';
import { verbsApi } from '../../api';
import { notifier } from '../notifier';
import { uploadChangesToNest } from './uploadData';

export const downloadVerbsData = async () => {
  // TODO: need here?
  await uploadChangesToNest();

  await verbsApi.updateVerbsOnServer();
  const serverVerbs = await verbsApi.getAllVerbs();

  await db.transaction('rw', db.verbs, async () => {
    await db.verbs.clear();

    await db.verbs.bulkAdd(
      serverVerbs.map(item => {
        return {
          word_id: item.word_id,
          data: item.data,
        };
      }),
    );
  });

  notifier.notify('verbs-update');
};

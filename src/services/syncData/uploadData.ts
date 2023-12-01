import { db } from '../../storage/db';
import { uploadWords as uploadWordsSupabase } from '../../api/methods/words';
import { uploadCategories as uploadCategoriesSupabase } from '../../api/methods/categories';
import { uploadCategoriesWords as uploadCategoriesWordsSupabase } from '../../api/methods/categoriesWords';
import { categoriesApi, categoriesWordsApi, syncsApi, wordsApi } from '../../api2';
import { camelCase, uniq } from 'lodash';

const generateMessageNumber = async () => {
  const latestMessageEntry = await db.sync.orderBy('messageId').last();
  if (!latestMessageEntry) {
    return;
  }

  const number = latestMessageEntry.messageId;

  if (number === -1) {
    return 1;
  }

  return number + 1;
};

const markChanges = async () => {
  const unmarkedLength = await db.sync.where('messageId').equals(-1).count();

  if (!unmarkedLength) {
    return;
  }

  const messageNumber = await generateMessageNumber();
  await db.sync.where('messageId').equals(-1).modify({
    messageId: messageNumber,
  });
};

const sendUpdates = async () => {
  const ids = await db.sync.orderBy('messageId').keys();

  const uniqIds = uniq(ids);
  if (!uniqIds.length) {
    return;
  }

  for (const id of uniqIds) {
    const envelopeId = await syncsApi.createEnvelope();

    const entries = await db.sync.where({ messageId: id }).toArray();

    const data = entries.map(entry => {
      let value;

      if (entry.value != null) {
        const ent = Object.entries(entry.value).map(([key, value]) => {
          return [camelCase(key), value];
        });
        value = Object.fromEntries(ent);
      }

      const data = {
        entryType: entry.entryType,
        entryId: entry.entryId,
        value,
      };

      return data;
    });

    // TODO: chunk by 100 entries
    await syncsApi.uploadData(envelopeId, data);
    await syncsApi.syncData(envelopeId);

    await db.sync.where({ messageId: id }).delete();
  }
};

export const uploadChangesToNest = async () => {
  await markChanges();
  await sendUpdates();
};

export const uploadToSupabase = async () => {
  const uploadWords = async () => {
    const words = await db.words.toArray();
    await uploadWordsSupabase(words);
  };

  const uploadCategories = async () => {
    const categories = await db.categories.toArray();
    await uploadCategoriesSupabase(categories);
  };

  const uploadCategoriesWords = async () => {
    const data = await db.categories_words.toArray();
    await uploadCategoriesWordsSupabase(data);
  };

  await Promise.all([
    //
    uploadWords(),
    uploadCategories(),
    uploadCategoriesWords(),
  ]);
};

export const uploadToNestHard = async () => {
  const uploadWords = async () => {
    const words = await db.words.toArray();
    await wordsApi.uploadWords(words);
  };

  const uploadCategories = async () => {
    const categories = await db.categories.toArray();
    await categoriesApi.uploadCategories(categories);
  };

  const uploadCategoriesWords = async () => {
    const data = await db.categories_words.toArray();
    await categoriesWordsApi.upload(data);
  };

  await Promise.all([
    //
    uploadWords(),
    uploadCategories(),
  ]);

  await uploadCategoriesWords();
};

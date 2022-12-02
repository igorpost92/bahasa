import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { db } from '../../../storage/db';
import { getWords, uploadWords as uploadWordsServer, WordServer } from '../../../api/methods/words';
import { getUser } from '../../../api/methods/auth';
import { isProd } from '../../../utils/isProd';
import { getAllVerbs } from '../../../api/methods/verbs';

interface Props {}

const methods = {
  uploadWords: async (email: string) => {
    const words = await db.words.toArray();
    const serverWords: WordServer[] = words.map(w => ({
      ...w,
      email,
    }));

    await uploadWordsServer(serverWords);
  },

  downloadWords: async () => {
    await db.words.clear();
    const serverWords = await getWords();

    await db.words.bulkAdd(
      serverWords.map(item => {
        return {
          id: item.id,
          text: item.text,
          meaning: item.meaning,
          type: item.type,
          created_at: item.created_at,
          last_date: item.last_date,
          step: item.step,
          lang: item.lang,
          examples: item.examples,
        };
      }),
    );
  },

  downloadVerbs: async () => {
    await db.verbs.clear();
    const serverVerbs = await getAllVerbs();

    debugger;

    await db.verbs.bulkAdd(
      serverVerbs.map(item => {
        return {
          word_id: item.word_id,
          name: item.name,
          data: item.data,
        };
      }),
    );
  },
};

const Sync: React.FC<Props> = props => {
  const isProduction = isProd();

  const upload = async () => {
    const email = getUser()?.email;
    if (!email) {
      throw new Error('no email');
    }

    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    methods.uploadWords(email);
  };

  const downloadWords = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    await methods.downloadWords();

    alert('Done');
  };

  const downloadVerbs = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    await methods.downloadVerbs();

    alert('Done');
  };

  return (
    <div className={styles.wrap}>
      {isProduction && <Button onClick={upload}>Upload words</Button>}
      {!isProduction && <Button onClick={downloadWords}>Download words</Button>}
      <Button onClick={downloadVerbs}>Download verbs</Button>
    </div>
  );
};

export default Sync;

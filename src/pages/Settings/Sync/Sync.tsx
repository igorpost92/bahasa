import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { db } from '../../../storage/db';
import { getWords, uploadWords as uploadWordsServer, WordServer } from '../../../api/methods/words';
import { getUser } from '../../../api/methods/auth';
import { isProd } from '../../../utils/isProd';

interface Props {}

const uploadWords = async (email: string) => {
  const words = await db.words.toArray();
  const serverWords: WordServer[] = words.map(w => ({
    ...w,
    email,
  }));

  await uploadWordsServer(serverWords);
};

const downloadWords = async () => {
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
};

const Sync: React.FC<Props> = props => {
  const upload = async () => {
    const email = getUser()?.email;
    if (!email) {
      throw new Error('no email');
    }

    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    uploadWords(email);
  };

  const download = () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    downloadWords();
  };

  return (
    <div className={styles.wrap}>
      <Button onClick={upload}>Upload words</Button>
      {!isProd && <Button onClick={download}>Download words</Button>}
    </div>
  );
};

export default Sync;

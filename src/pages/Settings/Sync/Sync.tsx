import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { downloadFromNest, downloadFromSupabase } from '../../../services/syncData/downloadData';
import { downloadVerbsData } from '../../../services/syncData/downloadVerbs';
import {
  uploadToNestHard,
  uploadToSupabase,
} from '../../../services/syncData/uploadData';

const askAndDo = async (fn: () => Promise<void>) => {
  if (!confirm('Are you sure? Operation is irreversible!')) {
    return;
  }

  try {
    await fn();
    alert('Done');
  } catch (e) {
    alert(e);
  }
};

const Sync: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <Button onClick={() => askAndDo(uploadToSupabase)}>Upload to Supabase</Button>
      <br />
      <Button onClick={() => askAndDo(uploadToNestHard)}>!!! Upload to Nest HARD !!!</Button>
      <div className={styles.info}>you will lose verbs conjugation data</div>
      <br />
      <Button onClick={() => askAndDo(downloadFromSupabase)}>Download from Supabase</Button>
      <Button onClick={() => askAndDo(downloadFromNest)}>Download from Nest</Button>
      <br />
      <Button onClick={() => askAndDo(downloadVerbsData)}>Download verbs (supabase)</Button>
    </div>
  );
};

export default Sync;

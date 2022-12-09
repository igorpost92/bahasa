import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { getUser } from '../../../api/methods/auth';
import { isProd } from '../../../utils/isProd';
import { downloadWordsData } from '../../../services/syncData/downloadData';
import { uploadWordsData } from '../../../services/syncData/uploadData';
import { downloadVerbsData } from '../../../services/syncData/downloadVerbs';

const Sync: React.FC = () => {
  const isProduction = isProd();

  const upload = async () => {
    const email = getUser()?.email;
    if (!email) {
      throw new Error('no email');
    }

    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    uploadWordsData(email);
  };

  const download = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    await downloadWordsData();

    alert('Done');
  };

  const downloadVerbs = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    await downloadVerbsData();

    alert('Done');
  };

  return (
    <div className={styles.wrap}>
      {isProduction && <Button onClick={upload}>Upload words</Button>}
      {!isProduction && <Button onClick={download}>Download words</Button>}
      <Button onClick={downloadVerbs}>Download verbs</Button>
    </div>
  );
};

export default Sync;

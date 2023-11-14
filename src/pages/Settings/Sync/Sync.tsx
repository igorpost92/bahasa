import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { isProd } from '../../../utils/isProd';
import { downloadWordsData } from '../../../services/syncData/downloadData';
import { uploadWordsData } from '../../../services/syncData/uploadData';
import { downloadVerbsData } from '../../../services/syncData/downloadVerbs';

const Sync: React.FC = () => {
  const isProduction = isProd();

  const upload = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    try {
      uploadWordsData();
      alert('Done');
    } catch (e) {
      alert(e);
    }
  };

  const download = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    try {
      await downloadWordsData();
      alert('Done');
    } catch (e) {
      alert(e);
    }
  };

  const downloadVerbs = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    try {
      await downloadVerbsData();
      alert('Done');
    } catch (e) {
      alert(e);
    }
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

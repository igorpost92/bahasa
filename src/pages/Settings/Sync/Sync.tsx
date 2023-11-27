import React from 'react';
import styles from './Sync.module.scss';
import { Button } from '../../../kit';
import { downloadWordsData } from '../../../services/syncData/downloadData';
import { uploadWordsData } from '../../../services/syncData/uploadData';
import { downloadVerbsData } from '../../../services/syncData/downloadVerbs';
import { useMainStore } from '../../../stores/mainStore';

const Sync: React.FC = () => {
  const mainStore = useMainStore();

  const upload = async () => {
    if (!confirm('Are you sure? Operation is irreversible!')) {
      return;
    }

    try {
      await uploadWordsData();
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

  const superModeContent = mainStore.isSuperMode && (
    <>
      <br />
      <Button onClick={upload}>Upload data</Button>
      <Button onClick={download}>Download data</Button>
      <br />
      <Button onClick={() => mainStore.setSuperMode(false)} intent={'danger'}>
        Disable super mode
      </Button>
    </>
  );

  return (
    <div className={styles.wrap}>
      <Button onClick={downloadVerbs}>Download verbs</Button>
      {superModeContent}
    </div>
  );
};

export default Sync;

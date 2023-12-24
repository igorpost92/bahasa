import React, { useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import styles from './VerbsList.module.css';
import { VerbEntryData } from '../../../storage/types';
import { Input, Button, smartSearch } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { shuffle } from '../../../utils/shuffle';
import BackButton from '../../../components/BackButton/BackButton';
import VerbCard from './VerbCard';
import { downloadVerbsData } from '../../../services/syncData/downloadVerbs';

interface Props {
  verbs: VerbEntryData[];
  onSelect: (verb: VerbEntryData[]) => void;
}

const VerbsList: React.FC<Props> = props => {
  const [searchInput, setSearchInput] = useState('');

  const data = useMemo(() => {
    const verbs = smartSearch(props.verbs, searchInput, ['name', 'meaning'], {
      ignoreDiacritics: true,
    });

    return sortBy(verbs, item => item.name);
  }, [props.verbs, searchInput]);

  const onShuffle = () => {
    const verbs = shuffle(data);
    props.onSelect(verbs);
  };

  return (
    <AppPage
      headerLeft={<BackButton />}
      headerTitle={'Verbs'}
      headerBottom={
        <>
          <Input className={styles.searchInput} value={searchInput} onChange={setSearchInput} />
          <Button onClick={onShuffle}>Shuffle</Button>
        </>
      }
    >
      <div>
        <div className={styles.subtitle}>Count: {data.length}</div>

        {data.map(item => {
          const noData = !Object.keys(item.data).length;
          return (
            <div
              key={item.word_id}
              className={styles.word}
              onClick={async () => {
                // TODO: spinner and notification
                if (noData) {
                  await downloadVerbsData();
                  alert('done');
                  return;
                }

                props.onSelect([item]);
              }}
            >
              <VerbCard
                name={item.name}
                meaning={item.meaning}
                noData={!Object.keys(item.data).length}
              />
            </div>
          );
        })}
      </div>
    </AppPage>
  );
};

export default VerbsList;

import React, { useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import styles from './VerbsList.module.scss';
import { VerbEntryData } from '../../../storage/types';
import { Input, Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { shuffle } from '../../../utils/shuffle';
import BackButton from '../../../components/BackButton/BackButton';
import VerbCard from './VerbCard';

interface Props {
  verbs: VerbEntryData[];
  onSelect: (verb: VerbEntryData[]) => void;
}

const VerbsList: React.FC<Props> = props => {
  const [searchInput, setSearchInput] = useState('');

  const data = useMemo(() => {
    let data;

    if (!searchInput) {
      data = props.verbs;
    } else {
      const searchString = searchInput.toLowerCase();
      data = props.verbs.filter(
        item =>
          item.name.toLowerCase().includes(searchString) ||
          item.meaning.toLowerCase().includes(searchString),
      );
    }

    return sortBy(data, item => item.name);
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
              onClick={() => {
                if (noData) {
                  alert('Downloading will be available in the next release');
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

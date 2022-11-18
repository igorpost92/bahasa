import React, { useMemo, useState } from 'react';
import styles from './VerbsList.module.scss';
import { VerbEntryData } from '../../../storage/types';
import { Input, Button } from '../../../kit';
import WordMini from '../../../components/WordMini/WordMini';
import { AppPage } from '../../../components/AppPage/AppPage';
import { shuffle } from '../../../utils/shuffle';
import BackButton from '../../../components/BackButton/BackButton';

interface Props {
  verbs: VerbEntryData[];
  onSelect: (verb: VerbEntryData[]) => void;
}

const VerbsList: React.FC<Props> = props => {
  const [searchInput, setSearchInput] = useState('');

  const data = useMemo(() => {
    if (!searchInput) {
      return props.verbs;
    }

    const searchString = searchInput.toLowerCase();
    return props.verbs.filter(({ name }) => name.toLowerCase().includes(searchString));
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

        {data.map(item => (
          <div key={item.word_id} className={styles.word} onClick={() => props.onSelect([item])}>
            <WordMini text={item.name} />
          </div>
        ))}
      </div>
    </AppPage>
  );
};

export default VerbsList;

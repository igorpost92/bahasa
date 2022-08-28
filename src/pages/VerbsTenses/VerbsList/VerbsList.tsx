import React, { useMemo, useState } from 'react';
import styles from './VerbsList.module.scss';
import { VerbData } from '../../../api/methods/verbs';
import Input from '../../../kit/components/Input/Input';
import Button from '../../../kit/components/Button/Button';
import WordMini from '../../../components/WordMini/WordMini';
import { Link } from 'react-router-dom';
import AppPage from '../../../components/AppPage/AppPage';
import { shuffle } from '../../../utils/shuffle';

interface Props {
  verbs: VerbData[];
  onSelect: (verb: VerbData[]) => void;
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
      headerLeft={
        <Link to={'..'}>
          <Button>Back</Button>
        </Link>
      }
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
          <div className={styles.word} onClick={() => props.onSelect([item])}>
            <WordMini key={item.id} text={item.name} />
          </div>
        ))}
      </div>
    </AppPage>
  );
};

export default VerbsList;

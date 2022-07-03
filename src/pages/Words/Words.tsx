import React, { useMemo, useState } from 'react';
import styles from './Words.module.scss';
import { useWords } from '../../api/hooks/useWords';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Words: React.FC = () => {
  const { isLoading, data } = useWords();
  const [searchInput, setSearchInput] = useState('');

  const sortedWords = useMemo(() => {
    return (data ?? []).sort((a, b) => {
      const dateA = a.created_at.getTime();
      const dateB = b.created_at.getTime();
      return dateB - dateA;
    });
  }, [data])

  const items = useMemo(() => {
    if (!searchInput) {
      return sortedWords;
    }

    const searchStr = searchInput.toLowerCase();

    return sortedWords.filter(item => item.text.toLowerCase().includes(searchStr)
      || item.meaning.toLowerCase().includes(searchStr));
  }, [searchInput, sortedWords]);

  return (
    <div className={styles.wrap}>
      <div className={styles.linksWrap}>
        <Link to={'/game'}>
          <Button>
            Game
          </Button>
        </Link>

        <Link to={'/words/new'}>
          <Button type={'success'}>
            Add
          </Button>
        </Link>

        <div className={styles.wordCounter}>
          Words: {items.length}
        </div>
      </div>

      <Input
        className={styles.search}
        value={searchInput}
        onChange={setSearchInput}
        placeholder={'Search...'}
      />

      {isLoading && <div>loading...</div>}

      {!isLoading && !items.length && <div>no words</div>}

      {!!items.length && (
        <div className={styles.list}>
          {items
            .map(item => (
              <Link key={item.id} to={`/words/${item.id}`} className={styles.word}>
                <div className={styles.text}>{item.text}</div>
                <div className={styles.meaning}>{item.meaning}</div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Words;

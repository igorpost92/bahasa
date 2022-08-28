import React, { useMemo, useState } from 'react';
import { useWords } from '../../api/hooks/useWords';
import { Link } from 'react-router-dom';
import Button from '../../kit/components/Button/Button';
import Input from '../../kit/components/Input/Input';
import { Word } from '../../types';
import WordMini from '../../components/WordMini/WordMini';
import AppPage from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../kit/components/Spinner/Spinner';
import Select from '../../kit/components/Select/Select';
import styles from './Words.module.scss';

const sorts = [
  {
    value: 'date-desc',
    name: 'Date added (desc)',
    getField: (word: Word) => word.created_at.getTime(),
    sortK: -1,
  },
  {
    value: 'date-asc',
    name: 'Date added (asc)',
    getField: (word: Word) => word.created_at.getTime(),
  },
  {
    value: 'step-desc',
    name: 'Step (desc)',
    getField: (word: Word) => word.step ?? 0,
    sortK: -1,
  },
  {
    value: 'step-asc',
    name: 'Step (asc)',
    getField: (word: Word) => word.step ?? 0,
  },
];

const Words: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data } = useWords();
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState(sorts[0].value);

  const sortedWords = useMemo(() => {
    const sortRule = sorts.find(item => item.value === sort);

    if (!sortRule) {
      return data ?? [];
    }
    return (data ?? []).sort((a, b) => {
      const valueA = sortRule.getField(a);
      const valueB = sortRule.getField(b);
      const sortNumber = valueA - valueB;
      return sortNumber * (sortRule.sortK ?? 1);
    });
  }, [data, sort]);

  const items = useMemo(() => {
    if (!searchInput) {
      return sortedWords;
    }

    const searchStr = searchInput.toLowerCase();

    return sortedWords.filter(
      item =>
        item.text.toLowerCase().includes(searchStr) ||
        item.meaning.toLowerCase().includes(searchStr),
    );
  }, [searchInput, sortedWords]);

  return (
    <AppPage
      headerLeft={
        <div className={styles.linksWrap}>
          {/*// TODO: menu*/}

          <Link to={'/game'}>
            <Button>Game</Button>
          </Link>

          <Link to={'/words/new'}>
            <Button type={'success'}>Add</Button>
          </Link>

          {lang === 'ES' && (
            <Link to={'/verbs'}>
              <Button>Verbs</Button>
            </Link>
          )}

          <div className={styles.spacer} />

          {/*todo*/}
          <Link to={'/global-repeat'} className={styles.repeatBtn}>
            <Button>GR</Button>
          </Link>
        </div>
      }
      headerBottom={
        <div className={styles.searchRow}>
          <Input value={searchInput} onChange={setSearchInput} placeholder={'Search...'} />
          <Select
            className={styles.sortSelect}
            onChange={setSort as any}
            options={sorts}
            value={sort}
          />
        </div>
      }
    >
      {isLoading && <Spinner />}

      {!isLoading && !items.length && <div>no words</div>}

      {!!items.length && <div className={styles.subtitle}>Count: {items.length}</div>}

      {!!items.length && (
        <div className={styles.list}>
          {items.map(item => (
            <WordMini
              key={item.id}
              url={`/words/${item.id}`}
              text={item.text}
              meaning={item.meaning}
              step={item.step ?? undefined}
              tag={item.type ?? undefined}
            />
          ))}
        </div>
      )}
    </AppPage>
  );
};

export default Words;

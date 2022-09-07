import React, { useMemo, useState } from 'react';
import { useWords } from '../../api/hooks/words/useWords';
import { Button, Input, Spinner, Select } from '../../kit';
import { WordEntry } from '../../api/types';
import WordMini from '../../components/WordMini/WordMini';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import styles from './Words.module.scss';

const sorts = [
  {
    value: 'date-desc',
    name: 'Date (desc)',
    getField: (word: WordEntry) => word.created_at.getTime(),
    sortK: -1,
  },
  {
    value: 'date-asc',
    name: 'Date (asc)',
    getField: (word: WordEntry) => word.created_at.getTime(),
  },
  {
    value: 'name-asc',
    name: 'Name (asc)',
    getField: (word: WordEntry) => word.text.toLowerCase(),
  },
  {
    value: 'name-desc',
    name: 'Name (desc)',
    getField: (word: WordEntry) => word.text.toLowerCase(),
    sortK: -1,
  },
  {
    value: 'step-desc',
    name: 'Step (desc)',
    getField: (word: WordEntry) => word.step ?? 0,
    sortK: -1,
  },
  {
    value: 'step-asc',
    name: 'Step (asc)',
    getField: (word: WordEntry) => word.step ?? 0,
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

      let sortNumber = 0;
      if (valueA > valueB) {
        sortNumber = 1;
      } else if (valueB > valueA) {
        sortNumber = -1;
      }

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
      showTabBar
      headerTitle={'Words'}
      headerLeft={
        <Button url={'/words/new'} intent={'success'}>
          Add
        </Button>
      }
      headerBottom={
        <div className={styles.searchRow}>
          <Input
            className={styles.searchInput}
            value={searchInput}
            onChange={setSearchInput}
            placeholder={'Search...'}
          />
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
              url={String(item.id)}
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

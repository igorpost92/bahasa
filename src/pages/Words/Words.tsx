import React, { useMemo, useState } from 'react';
import styles from './Words.module.scss';
import { useWords } from '../../api/hooks/useWords';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Word } from '../../types';
import WordMini from '../../components/WordMini/WordMini';
import Page from '../../components/Page/Page';
import SelectedLangButton from '../../components/Page/Header/SelectedLangButton/SelectedLangButton';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../components/Spinner/Spinner';

const sorts = [
  {
    name: 'Date added (desc)',
    getField: (word: Word) => word.created_at.getTime(),
    sortK: -1,
  },
  {
    name: 'Date added (asc)',
    getField: (word: Word) => word.created_at.getTime(),
  },
  {
    name: 'Step (desc)',
    getField: (word: Word) => word.step ?? 0,
    sortK: -1,
  },
  {
    name: 'Step (asc)',
    getField: (word: Word) => word.step ?? 0,
  },
];

const Words: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data } = useWords(lang);
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState(0);

  const sortedWords = useMemo(() => {
    const sortRule = sorts[sort];

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
      item => item.text.toLowerCase().includes(searchStr) || item.meaning.toLowerCase().includes(searchStr),
    );
  }, [searchInput, sortedWords]);

  return (
    <Page
      customHeader={
        <>
          <div className={styles.linksWrap}>
            {/*// TODO: menu*/}

            <Link to={'/game'}>
              <Button>Game</Button>
            </Link>

            <Link to={'/words/new'}>
              <Button type={'success'}>Add</Button>
            </Link>

            <div className={styles.spacer} />

            {/*todo*/}
            <Link to={'/global-repeat'} className={styles.repeatBtn}>
              <Button>GR</Button>
            </Link>

            <div className={styles.wordCounter}>Words: {items.length}</div>

            <SelectedLangButton />
          </div>

          <div className={styles.searchRow}>
            <Input value={searchInput} onChange={setSearchInput} placeholder={'Search...'} />

            <select className={styles.sortSelect} value={sort} onChange={e => setSort(Number(e.target.value))}>
              {sorts.map((item, idx) => (
                <option value={idx}>{item.name}</option>
              ))}
            </select>
          </div>
        </>
      }
    >
      {isLoading && <Spinner />}

      {!isLoading && !items.length && <div>no words</div>}

      {!!items.length && (
        <div className={styles.list}>
          {items.map(item => (
            <WordMini
              key={item.id}
              url={`/words/${item.id}`}
              text={item.text}
              meaning={item.meaning}
              step={item.step}
            />
          ))}
        </div>
      )}
    </Page>
  );
};

export default Words;

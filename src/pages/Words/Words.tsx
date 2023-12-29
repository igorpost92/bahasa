import React, { useMemo, useState } from 'react';
import { Button, Input, PlusIcon, Select, smartSearch } from '../../kit';
import WordMini from '../../components/WordMini/WordMini';
import { AppPage } from '../../components/AppPage/AppPage';
import styles from './Words.module.css';
import { useWords, wordsSorts } from '../../storage/hooks/words';
import { Modals, useModal } from '../../modals/useModals';

const Words: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState(wordsSorts[0].value);
  const wordsRequest = useWords({ live: true, sort });

  const wordModal = useModal(Modals.Word);

  const openWord = (id?: string) => {
    wordModal.open({ id });
  };

  const data = useMemo(() => {
    return smartSearch(wordsRequest.data, searchInput, ['text', 'meaning'], {
      ignoreDiacritics: true,
    });
  }, [searchInput, wordsRequest.data]);

  let content;

  if (wordsRequest.isLoading) {
    //
  } else if (!data.length) {
    content = <div>no words</div>;
  } else {
    content = (
      <>
        <div className={styles.subtitle}>Count: {data.length}</div>
        <div className={styles.list}>
          {data.map(item => (
            <WordMini
              key={item.id}
              onClick={() => openWord(item.id)}
              text={item.text}
              meaning={item.meaning}
              step={item.step ?? undefined}
              tag={item.type ?? undefined}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <AppPage
      showTabBar
      headerTitle={'Words'}
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
            options={wordsSorts}
            value={sort}
          />
        </div>
      }
    >
      {content}
      <div className={styles.bottomButtons}>
        <Button url={'/repeat'} className={styles.btn}>
          Repeat
        </Button>
        <Button onClick={openWord} intent={'primary'} className={styles.btn}>
          <PlusIcon /> Add
        </Button>
      </div>
    </AppPage>
  );
};

export default Words;

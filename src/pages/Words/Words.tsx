import React, { useMemo, useState } from 'react';
import { Button, Input, Select } from '../../kit';
import WordMini from '../../components/WordMini/WordMini';
import { AppPage } from '../../components/AppPage/AppPage';
import styles from './Words.module.scss';
import { useWords, wordsSorts } from '../../storage/hooks/words';
import { smartSearch } from '../../kit/utils';
import { removeDiacritics } from '../../utils/removeDiacritics';
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
    if (!searchInput) {
      return wordsRequest.data;
    }

    return smartSearch(wordsRequest.data, ['text', 'meaning'], searchInput, removeDiacritics);
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
      headerLeft={
        <Button intent={'primary'} onClick={openWord}>
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
            options={wordsSorts}
            value={sort}
          />
        </div>
      }
    >
      {content}
    </AppPage>
  );
};

export default Words;

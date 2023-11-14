import React, { useMemo, useState } from 'react';
import styles from './Categories.module.scss';
import { Button, Input } from '../../kit/';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCategories } from '../../storage/hooks/categories';
import CategoriesList from './CategoriesList/CategoriesList';
import { Modals, useModal } from '../../modals/useModals';

interface Props {}

const Categories: React.FC<Props> = props => {
  const [searchInput, setSearchInput] = useState('');
  const request = useCategories();

  const categoryModal = useModal(Modals.Category);

  const openCategory = (id?: string) => {
    categoryModal.open({ id });
  };

  const data = useMemo(() => {
    if (!request.data) {
      return [];
    }

    if (!searchInput) {
      return request.data;
    }

    const search = searchInput.toLowerCase();
    return request.data.filter(item => item.name.toLowerCase().includes(search));
  }, [searchInput, request.data]);

  let content;

  if (request.isLoading) {
    //   content = <Spinner />;
  } else if (!data.length) {
    content = <div>No data</div>;
  } else {
    content = <CategoriesList data={data} onOpen={openCategory} />;
  }

  return (
    <AppPage
      showTabBar
      headerLeft={
        <Button intent={'primary'} onClick={openCategory}>
          Add
        </Button>
      }
      headerTitle={'Categories'}
      headerBottom={
        <Input className={styles.input} value={searchInput} onChange={setSearchInput} />
      }
    >
      {content}
    </AppPage>
  );
};

export default Categories;

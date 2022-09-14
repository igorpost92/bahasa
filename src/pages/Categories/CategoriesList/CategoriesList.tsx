import React from 'react';
import styles from './CategoriesList.module.scss';
import { Card, Tag } from '../../../kit';
import { CategoryListEntry } from '../../../storage/types';

interface Props {
  data: CategoryListEntry[];
  onOpen: (id: string) => void;
}

const CategoriesList: React.FC<Props> = props => {
  return (
    <div className={styles.wrap}>
      {props.data.map(item => (
        <Card
          key={item.id}
          className={styles.category}
          onClick={() => {
            props.onOpen(item.id);
          }}
        >
          {item.name}
          <Tag>{item.length}</Tag>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesList;

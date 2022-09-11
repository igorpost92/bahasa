import React from 'react';
import styles from './CategoriesList.module.scss';
import { Card } from '../../../kit';
import { Link } from 'react-router-dom';
import { CategoryListEntry } from '../../../storage/types';

interface Props {
  data: CategoryListEntry[];
}

const CategoriesList: React.FC<Props> = props => {
  // TODO: len styles

  return (
    <div className={styles.wrap}>
      {props.data.map(item => (
        <Link key={item.id} to={String(item.id)} className={styles.category}>
          <Card>
            {item.name} <div>{item.length}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;

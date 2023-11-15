import React, { useEffect, useState } from 'react';
import styles from './FullRepeat.module.scss';
import { useCategories } from '../../storage/hooks/categories';
import { Button, Checkbox, useList } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { GameLocationState } from '../Game/Game';
import BackButton from '../../components/BackButton/BackButton';

interface CategoryRowProps {
  title: string;
  length: number;
  checked: boolean;
  onChange: () => void;
}

const CategoryRow = (props: CategoryRowProps) => {
  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      labelPosition={'left'}
      className={cn(styles.categoryRow)}
    >
      <div>{props.title}</div>
      {/* TODO:format plural */}
      <div className={styles.wordsCount}>Words: {props.length}</div>
    </Checkbox>
  );
};

const FullRepeat: React.FC = () => {
  const navigate = useNavigate();

  const [invertedMode, setInvertedMode] = useState(false);

  const { isLoading, ...categoriesRequest } = useCategories();
  const data = categoriesRequest.data ?? [];

  const [checkedCategories, actions] = useList<string>([]);

  const allChecked = checkedCategories.length === data.length;
  const totalWordsCount = data.reduce((acc, item) => acc + item.length, 0) ?? 0;

  const toggleAll = () => {
    if (allChecked) {
      actions.clear();
    } else {
      actions.set(data.map(item => item.id) ?? []);
    }
  };

  useEffect(() => {
    // TODO: onloaded, only one time
    // actions.set(data.map(item => item.id) || []);
  }, [data]);

  return (
    <AppPage headerTitle={'Full repeat'} headerLeft={<BackButton />}>
      <CategoryRow
        title={'Select categories'}
        length={totalWordsCount}
        checked={allChecked}
        onChange={toggleAll}
      />

      {data.map(item => {
        const isChecked = actions.has(item.id);

        return (
          <CategoryRow
            key={item.id}
            title={item.name}
            length={item.length}
            checked={isChecked}
            onChange={() => actions.toggle(item.id)}
          />
        );
      })}

      <br />
      <br />
      <br />
      <Checkbox checked={invertedMode} onChange={setInvertedMode} labelPosition={'left'}>
        Inverted mode
      </Checkbox>

      <Button
        onClick={() => {
          // TODO: keep state of current page

          const config: GameLocationState = {
            categories: checkedCategories,
            globalRepeatMode: true,
            invertedMode,
          };

          navigate('/repeat', {
            state: config,
          });
        }}
        intent={'primary'}
        size={'l'}
        className={styles.startBtn}
      >
        Start
      </Button>
    </AppPage>
  );
};

export default FullRepeat;

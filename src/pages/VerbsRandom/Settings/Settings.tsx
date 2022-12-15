import React from 'react';
import styles from './Settings.module.scss';
import { Button, Checkbox } from '../../../kit';
import cn from 'classnames';
import { useList } from '../../../kit/hooks';
import { verbsConfigByKeys } from '../../../../constants/verbsConfig';

interface CategoryRowProps {
  title: string;
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
      {props.title}
    </Checkbox>
  );
};

const tenses = Object.keys(verbsConfigByKeys);

interface Props {
  onStart: (tenses: string[]) => void;
}

const Settings: React.FC<Props> = props => {
  const [checkedTenses, actions] = useList<string>([]);

  const allChecked = checkedTenses.length === tenses.length;

  const toggleAll = () => {
    if (allChecked) {
      actions.clear();
    } else {
      actions.set(tenses ?? []);
    }
  };

  return (
    <div className={styles.wrap}>
      <CategoryRow title={'Select categories'} checked={allChecked} onChange={toggleAll} />

      {tenses.map(item => {
        const isChecked = actions.has(item);

        return (
          <CategoryRow
            key={item}
            title={item}
            checked={isChecked}
            onChange={() => actions.toggle(item)}
          />
        );
      })}

      <br />
      <br />

      <Button
        onClick={() => {
          // TODO: keep state of current page
          // const config: GameLocationState = {
          // 	categories: checkedCategories,
          // 	globalRepeatMode: true,
          // 	invertedMode,
          // };
          //
          // navigate('/repeat', {
          // 	state: config,
          // });

          props.onStart(checkedTenses);
        }}
        intent={'success'}
        size={'l'}
        className={styles.startBtn}
      >
        Start
      </Button>
    </div>
  );
};

export default Settings;

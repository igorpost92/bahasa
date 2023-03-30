import React from 'react';
import cn from 'classnames';
import styles from './SegmentedButtons.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  selectedValue: string | null;
  onChange: (value: string | null) => void;
  options: Option[];
}

export const SegmentedButtons: React.FC<Props> = props => {
  return (
    <div className={styles.wrap}>
      {props.options.map(item => {
        const isSelected = props.selectedValue === item.value;

        const onClick = () => {
          props.onChange(isSelected ? null : item.value);
        };

        return (
          <button className={cn(styles.btn, isSelected && styles.selected)} onClick={onClick}>
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

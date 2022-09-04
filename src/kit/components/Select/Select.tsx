import React, { useMemo, useState } from 'react';
import { ChevronDown } from '../../icons';
import cn from 'classnames';
import { Drawer, Input, Radio } from '../';
import styles from './Select.module.scss';

interface Option {
  value: string;
  name: string;
}

interface Props<T extends Option> {
  id?: string;
  className?: string;
  value?: string;
  onChange: (value?: string) => void;
  options: T[];
  searchable?: boolean;
}

const placeholder = 'Select';

// todo create new

export function Select<T extends Option>(props: Props<T>) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const label =
    (props.value && props.options.find(item => item.value === props.value)?.name) ?? placeholder;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChange = (value: string) => {
    props.onChange(value);
    closeModal();
  };

  const options = useMemo(() => {
    if (!searchInput) {
      return props.options;
    }

    const searchStr = searchInput.toLowerCase();
    return props.options.filter(({ name }) => name.toLowerCase().includes(searchStr));
  }, [props.options, searchInput]);

  return (
    <>
      <div className={cn(styles.wrap, props.className)} onClick={openModal}>
        <input
          id={props.id}
          className={cn(styles.input)}
          value={label}
          onFocus={openModal}
          readOnly
        />
        <ChevronDown className={styles.icon} />
      </div>

      <Drawer isOpen={isModalOpen} onClose={closeModal} big={props.searchable}>
        {props.searchable && (
          <Input
            className={styles.search}
            value={searchInput}
            onChange={setSearchInput}
            fullWidth
          />
        )}
        <div className={styles.optionsWrap}>
          {options.map(option => {
            const isChecked = props.value === option.value;

            return (
              <Radio
                key={option.value}
                className={styles.optionWrap}
                isChecked={isChecked}
                onChange={() => onChange(option.value)}
                label={option.name}
              />
            );
          })}
        </div>
      </Drawer>
    </>
  );
}

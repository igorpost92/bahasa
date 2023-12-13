import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDownIcon } from '../../icons';
import cn from 'classnames';
import { Button, Drawer, Input, Radio } from '../';
import styles from './Select.module.css';
import { smartSearch } from '../../utils';
// TODO: remove from kit
import { removeDiacritics } from '../../../utils/removeDiacritics';

interface Option {
  value: string;
  name: string;
}

// TODO: use null instead of undefined
type ValueType<M extends boolean> = M extends true ? string[] : string | undefined;

interface Props<T extends Option, M extends boolean> {
  id?: string;
  className?: string;
  value: ValueType<M>;
  onChange: (value: ValueType<M>) => void;
  options: T[];
  searchable?: boolean;
  multiple?: M;
  placeholder?: string;
  onCreateNew?: (text: string, setValue: (value: string) => void) => void;
}

// todo creating new element
// TODO: custom option format

export function Select<T extends Option, M extends boolean = false>(props: Props<T, M>) {
  const { placeholder = 'Select' } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!isModalOpen) {
      setSearchInput('');
    }
  }, [isModalOpen]);

  // TODO: label on multiple

  const label =
    (props.value && props.options.find(item => item.value === props.value)?.name) ?? placeholder;
  // TODO: placeholder

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChange = (value: string) => {
    // TODO: multiple
    if (Array.isArray(props.value)) {
      const currentValue = props.value as string[];

      let newValue;
      if (currentValue.includes(value)) {
        newValue = currentValue.filter(option => option !== value);
      } else {
        newValue = currentValue.concat(value);
      }

      props.onChange(newValue as ValueType<M>);
    } else {
      props.onChange(value as ValueType<M>);
      closeModal();
    }
  };

  const onCreateNew = () => {
    if (!searchInput) {
      return;
    }

    props.onCreateNew?.(searchInput, onChange);
  };

  const options = useMemo(() => {
    if (!searchInput) {
      return props.options;
    }

    return smartSearch(props.options, 'name', searchInput, removeDiacritics);
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
        <ChevronDownIcon className={styles.icon} />
      </div>

      <Drawer isOpen={isModalOpen} onClose={closeModal} size={props.searchable ? 'l' : undefined}>
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
            let isChecked;

            if (Array.isArray(props.value)) {
              const currentValue = props.value as string[];
              isChecked = currentValue.includes(option.value);
            } else {
              isChecked = props.value === option.value;
            }

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

          {!!searchInput.length && props.onCreateNew && (
            <Button onClick={onCreateNew}>Create new</Button>
          )}
        </div>
      </Drawer>
    </>
  );
}

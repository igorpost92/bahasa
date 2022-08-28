import React, { useState } from 'react';
import { ChevronDown } from '../../icons';
import cn from 'classnames';
import Drawer from '../Drawer/Drawer';
import Radio from '../Radio/Radio';
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
}

const placeholder = 'Select';

function Select<T extends Option>(props: Props<T>) {
  const [isModalOpen, setModalOpen] = useState(false);

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

      <Drawer isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.optionsWrap}>
          {props.options.map(option => {
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

export default Select;

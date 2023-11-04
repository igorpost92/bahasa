import React, { ChangeEvent, Ref } from 'react';
import { format } from 'date-fns';
import styles from './DateInput.module.scss';
import cn from 'classnames';

const stringifyDate = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

interface Props {
  className?: string;
  value?: Date | null;
  name?: string;
  onChange?: (value: Date) => void;
  onBlur?: () => void;
  inputRef?: Ref<HTMLInputElement>;
}

export const DateInput: React.FC<Props> = props => {
  const { inputRef, ...restProps } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const valueAsDate = new Date(value);
    if (isNaN(valueAsDate.getTime())) {
      return;
    }

    props.onChange?.(valueAsDate);
  };

  const valueAsString = props.value ? stringifyDate(props.value) : '';

  return (
    <input
      {...restProps}
      value={valueAsString}
      ref={inputRef}
      className={cn(styles.wrap, props.className)}
      type={'datetime-local'}
      onChange={onChange}
    />
  );
};

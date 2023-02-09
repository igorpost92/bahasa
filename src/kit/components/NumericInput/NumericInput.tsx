import React, { useState } from 'react';
import { Input, InputProps } from '../Input/Input';
import { sanitizeNumberInput } from './utils';

const EMPTY_VALUE = '';

export type NumericInputProps = Omit<InputProps, 'type' | 'value' | 'onChange'> & {
  value: number | null;
  onChange: (value: number | null) => void;
};

const stringifyNumber = (value: number | null) => {
  if (value == null) {
    return EMPTY_VALUE;
  }

  if (Object.is(value, -0)) {
    return '-0';
  }

  return String(value).replace(/\./g, ',');
};

const parseNumber = (input: string) =>
  input === EMPTY_VALUE ? null : Number(input.replace(/,/g, '.'));

export const NumericInput: React.FC<NumericInputProps> = props => {
  const [pendingValue, setPendingValue] = useState<string>();

  // TODO:
  // useDidUpdate(() => {
  //   if (!pendingValue) {
  //     return;
  //   }
  //
  //   if (parseFloat(pendingValue) !== props.value) {
  //     setPendingValue(undefined);
  //   }
  // }, [props.value]);

  const valueAsString = pendingValue ?? stringifyNumber(props.value);

  const handleInput = (inputValue: string) => {
    const sanitizedInput = sanitizeNumberInput(inputValue);

    const isNegativePending = sanitizedInput.endsWith('-');
    const isDecimalPending = sanitizedInput.endsWith(',');

    if (isNegativePending || isDecimalPending) {
      setPendingValue(sanitizedInput);

      if (isNegativePending) {
        return;
      }
    } else if (pendingValue !== undefined) {
      setPendingValue(undefined);
    }

    if (props.onChange) {
      const valueAsNumber = parseNumber(sanitizedInput);

      if (isDecimalPending) {
        const oldValueAsNumber = parseNumber(valueAsString);
        if (oldValueAsNumber === valueAsNumber) {
          return;
        }
      }

      props.onChange?.(valueAsNumber);
    }
  };

  return (
    <Input
      {...props}
      value={valueAsString}
      // inputMode="numeric"
      inputMode="decimal" // todo prop
      onChange={handleInput}
    />
  );
};

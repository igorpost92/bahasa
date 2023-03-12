import React, { useState } from 'react';
import { Input, InputProps } from '../Input/Input';
import { isDecimalNumberPending, parseNumber, sanitizeNumberInput, stringifyNumber } from './utils';

export type NumericInputProps = Omit<InputProps, 'type' | 'value' | 'onChange'> & {
  value: number | null;
  onChange: (value: number | null) => void;
};

export const NumericInput: React.FC<NumericInputProps> = props => {
  const [pendingValue, setPendingValue] = useState<string>();

  // TODO: if outside value chages during pending state
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
    const isDecimalPending = isDecimalNumberPending(sanitizedInput);

    if (isNegativePending || isDecimalPending) {
      setPendingValue(sanitizedInput);
    } else if (pendingValue) {
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
      inputMode="decimal" // todo prop
      onChange={handleInput}
    />
  );
};

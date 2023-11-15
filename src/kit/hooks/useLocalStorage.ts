import { useState } from 'react';
import { useAction } from './useAction';

const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }

  return JSON.parse(value);
};

const putToStorage = (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
};

export const useLocalStorage = <T = unknown>(key: string, initialValue?: T) => {
  const [value, setStateValue] = useState<T>(() => getFromStorage(key) || initialValue);

  // todo add param as function type
  const setValue = useAction((newValue: T) => {
    setStateValue(newValue);
    putToStorage(key, newValue);
  });

  return [value, setValue] as const;
};

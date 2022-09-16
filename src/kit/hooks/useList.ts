import { useState } from 'react';

export function useList<T extends any>(initialState: T[] = []) {
  const [list, setList] = useState(initialState);

  // TODO: can store list in ref and have constant actions

  const has = (element: T) => {
    return list.some(el => el === element);
  };

  const add = (element: T) => {
    setList(value => [...value, element]);
  };

  const set = (elements: T[]) => {
    setList([...elements]);
  };

  const remove = (element: T) => {
    setList(value => value.filter(el => el !== element));
  };

  const toggle = (element: T) => {
    if (has(element)) {
      remove(element);
    } else {
      add(element);
    }
  };

  const clear = () => {
    setList([]);
  };

  const actions = {
    has,
    add,
    set,
    remove,
    toggle,
    clear,
  };

  return [list, actions] as const;
}

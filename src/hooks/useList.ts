import { useMemo, useState } from 'react';

export function useList<T extends any>(initialState: T[] = []) {
  const [list, setList] = useState(initialState);

  const actions = useMemo(() => ({
    has: (element: T) => {
      return list.some(el => el === element)
    },
    add: (element: T) => {
      setList(value => [...value, element]);
    },
    remove: (element: T) => {
      setList(value => value.filter(el => el === element));
    },
  }), [list]);

  return [list, actions] as const;
}

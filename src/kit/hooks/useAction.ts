import { useCallback, useEffect, useRef } from 'react';

export function useAction<T extends (...args: any[]) => any>(callback: T | undefined) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, []);
}

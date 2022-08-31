import { useRef, useState } from 'react';

// TODO: initial as true
export const usePromise = <T, P>(fn: (...args: P[]) => Promise<T>, initialLoading = false) => {
  const [isLoading, setLoading] = useState(initialLoading);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callIdRef = useRef(0);

  const send = async (...args: P[]) => {
    const currentId = ++callIdRef.current;

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const result = await fn(...args);
      if (currentId !== callIdRef.current) {
        return;
      }

      setData(result);
    } catch (e) {
      if (currentId !== callIdRef.current) {
        return;
      }

      setError((e as Error)?.message ?? 'Unknown error');
    }

    setLoading(false);
  };

  return { isLoading, data, error, send };
};

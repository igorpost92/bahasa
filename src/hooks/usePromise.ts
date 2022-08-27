import { useRef, useState } from 'react';

export const usePromise = <T>(fn: () => Promise<T>, initialLoading = false) => {
  const [isLoading, setLoading] = useState(initialLoading);
  const [data, setData] = useState<T | null>(null);
  const [isError, setError] = useState(false);

  const callIdRef = useRef(0);

  const send = async () => {
    const currentId = ++callIdRef.current;

    setLoading(true);
    setData(null);
    setError(false);

    try {
      const result = await fn();
      if (currentId !== callIdRef.current) {
        return;
      }

      setData(result);
    } catch (e) {
      if (currentId !== callIdRef.current) {
        return;
      }

      setError(true);
    }

    setLoading(false);
  };

  return { isLoading, data, isError, send: send };
};

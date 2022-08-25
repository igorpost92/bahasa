import { useEffect, useState } from 'react';

export const useRequest = <T>(fn: () => Promise<T>) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [isError, setError] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await fn();
      setData(result);
    } catch (e) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return { isLoading, data, isError };
};

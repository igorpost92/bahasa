import { useEffect, useState } from 'react';
import { getWord } from '../index';
import { Word } from '../../types';

export const useWord = (id?: string) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Word>();

  const sendRequest = async () => {
    if (!id) {
      setLoading(false);
      return
    }

    const { data: result, error } = await getWord(id);
    if (result) {
      setData(result);
    }

    setLoading(false);
  };

  useEffect(() => {
      sendRequest();
  }, [id]);

  return { isLoading, data };
};

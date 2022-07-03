import { useEffect, useState } from 'react';
import { getAllWords } from '../index';
import { Word } from '../../types';
import { parseWordFromServer } from '../utils/parseWordFromServer';

export const useWords = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Word[]>();

  const sendRequest = async () => {
    const { data: result, error } = await getAllWords();
    if (result) {
      setData(result.map(parseWordFromServer));
    }

    setLoading(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return { isLoading, data };
};

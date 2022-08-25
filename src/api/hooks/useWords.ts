import { useEffect, useLayoutEffect, useState } from 'react';
import { getAllWords } from '../index';
import { Word } from '../../types';
import { parseWordFromServer } from '../utils/parseWordFromServer';

export const useWords = (lang: string) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Word[]>();

  const sendRequest = async () => {
    setLoading(true);
    setData([]);

    // TODO: error
    const { data: result, error } = await getAllWords(lang);
    if (result) {
      setData(result.map(parseWordFromServer));
    }

    setLoading(false);
  };

  useLayoutEffect(() => {
    sendRequest();
  }, [lang]);

  return { isLoading, data };
};

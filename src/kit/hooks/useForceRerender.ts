import { useCallback, useState } from 'react';

export const useForceRerender = () => {
  const [counter, setCounter] = useState(0);

  const rerender = useCallback(() => {
    setCounter(prev => prev + 1);
  }, []);

  return rerender;
};

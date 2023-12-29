import { useMainStore } from '../../stores/mainStore';
import { useEffect, useRef, useState } from 'react';

const CLICKS_THRESHOLD = 10;
const TIMEOUT = 1000;

export const useSuperModeActivator = () => {
  const isSuperMode = useMainStore(store => store.isSuperMode);
  const setSuperMode = useMainStore(store => store.setSuperMode);

  const [counter, setCounter] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (counter === CLICKS_THRESHOLD) {
      setSuperMode(true);
    }
  }, [counter]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const handleClick = () => {
    if (isSuperMode) {
      return;
    }

    clearTimeout(timer.current);
    setCounter(amount => amount + 1);
    timer.current = setTimeout(() => setCounter(0), TIMEOUT);
  };

  return handleClick;
};

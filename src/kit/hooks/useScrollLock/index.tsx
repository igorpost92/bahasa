import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export const useScrollLock = (enabled: boolean) => {
  const scrollPos = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const scrollTop = window.scrollY;
    scrollPos.current = scrollTop;
    document.body.classList.add(styles.preventBodyScroll);
    document.body.style.top = `-${scrollTop}px`;

    return () => {
      document.body.classList.remove(styles.preventBodyScroll);
      document.body.style.top = '';
      window.scroll({ top: scrollPos.current });
    };
  }, [enabled]);
};

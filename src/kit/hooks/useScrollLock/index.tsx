import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

export const ALLOW_INSIDE_SCROLL_CLASSNAME = 'allow-inside-scroll-classname';

const handler = (e: TouchEvent) => {
  const inModal = (e.target as HTMLElement).closest(`.${ALLOW_INSIDE_SCROLL_CLASSNAME}`);
  if (!inModal) {
    // TODO:
    // has scroll height

    e.preventDefault();
  }
};

export const useScrollLock = (enabled: boolean) => {
  // const scrollPos = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('touchmove', handler, { passive: false });

    // const scrollTop = window.scrollY;
    // scrollPos.current = scrollTop;
    document.body.classList.add(styles.preventBodyScroll);
    // document.body.style.top = `-${scrollTop}px`;

    return () => {
      document.removeEventListener('touchmove', handler);

      document.body.classList.remove(styles.preventBodyScroll);
      // document.body.style.top = '';
      // window.scroll({ top: scrollPos.current });
    };
  }, [enabled]);
};

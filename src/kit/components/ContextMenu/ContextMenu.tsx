import React, { useEffect, useRef, useState } from 'react';
import { Drawer } from '../Drawer/Drawer';

interface Props {
  menu: React.ReactNode;
  children: React.ReactElement;
}

// TODO:
// think of setting one wrapper for all elements
// like in the list
// instead of setting a wrapper for every element

export const ContextMenu: React.FC<Props> = props => {
  const targetRef = useRef<HTMLElement>();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    const startHandler = () => {
      timerId.current = setTimeout(() => {
        setMenuOpen(true);
        element.removeEventListener('touchmove', reset);
      }, 500);

      element.addEventListener('touchmove', reset);
    };

    const reset = () => {
      element.removeEventListener('touchmove', reset);
      clearTimeout(timerId.current);
    };

    element.addEventListener('touchstart', startHandler);
    element.addEventListener('touchend', reset);

    return () => {
      element.removeEventListener('touchstart', startHandler);
      element.removeEventListener('touchmove', reset);
      element.removeEventListener('touchend', reset);
    };
  }, [props.children]);

  return (
    <>
      {React.cloneElement(props.children, { ref: targetRef })}
      <Drawer isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}>
        {props.menu}
      </Drawer>
    </>
  );
};

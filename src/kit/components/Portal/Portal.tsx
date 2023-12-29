import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Portal.module.css';

interface Props {
  children: React.ReactNode;
}

// TODO: isOPen

// TODO: animate presence

export const Portal: React.FC<Props> = props => {
  const container = useMemo(() => {
    const element = document.createElement('div');
    element.classList.add(styles.portal);
    return element;
  }, []);

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(props.children, container);
};

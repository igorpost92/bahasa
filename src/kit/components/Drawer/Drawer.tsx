import React from 'react';
import cn from 'classnames';
import styles from './Drawer.module.css';
import { Portal } from '../Portal/Portal';
import { ALLOW_INSIDE_SCROLL_CLASSNAME, useScrollLock } from '../../hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { enterTransition, exitTransition } from '../../constants';

interface Props {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  /** ignored when position='left' */
  size?: 'm' | 'l' | 'xl';
  position?: 'left' | 'bottom';
  // TODO: close with swipe
}

const getAnimationVariants = (position: Props['position']) => {
  if (position === 'left') {
    const leftVariants = {
      visible: { x: 0 },
      hidden: { x: '-100%', transition: exitTransition },
    };

    return leftVariants;
  }

  const bottomVariants = {
    visible: { y: 0 },
    hidden: { y: '100%', transition: exitTransition },
  };

  return bottomVariants;
};

export const Drawer: React.FC<Props> = props => {
  useScrollLock(props.isOpen);

  const { size = 'm', position = 'left', isOpen } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <div className={styles.wrap}>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className={styles.backdrop}
              onClick={props.onClose}
              onContextMenu={e => {
                // for desktop
                e.preventDefault();
              }}
            />

            <motion.div
              key="drawer"
              variants={getAnimationVariants(position)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={enterTransition}
              className={cn(
                styles.content,
                props.className,
                styles[position],
                ALLOW_INSIDE_SCROLL_CLASSNAME,
                {
                  [styles.l]: size === 'l',
                  [styles.xl]: size === 'xl',
                },
              )}
            >
              {props.children}
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

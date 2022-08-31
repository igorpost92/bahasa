import React from 'react';
import cn from 'classnames';
import styles from './AppHeader.module.scss';
import SelectedLangButton from './SelectedLangButton/SelectedLangButton';

interface Props {
  className?: string;
  leftSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  children?: React.ReactNode;
  showLang?: boolean;
}

// TODO: centering if no left slot
// TODO: only only right
// TODO: right slot | null

const AppHeader: React.FC<Props> = ({ showLang = true, ...props }) => {
  const showHeader = Boolean(
    props.children || props.leftSlot || props.titleSlot || props.bottomSlot || showLang,
  );

  if (!showHeader) {
    return null;
  }

  const className = cn(styles.wrap, props.className);

  if (props.children) {
    return <div className={className}>{props.children}</div>;
  }

  return (
    <div className={className}>
      <div className={cn(styles.row, styles.topRow)}>
        <div className={styles.left}>{props.leftSlot}</div>

        {props.titleSlot && <h3>{props.titleSlot}</h3>}

        {showLang && (
          <div className={styles.right}>
            <SelectedLangButton />
          </div>
        )}
      </div>

      {props.bottomSlot && (
        <div className={cn(styles.row, styles.bottomRow)}>{props.bottomSlot}</div>
      )}
    </div>
  );
};

export default AppHeader;

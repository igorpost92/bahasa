import React from 'react';
import cn from 'classnames';
import styles from './AppHeader.module.scss';
import SelectedLangButton from './SelectedLangButton/SelectedLangButton';

interface Props {
  className?: string;
  leftSlot?: React.ReactNode;
  children?: React.ReactNode;
  showLang?: boolean;
}

const AppHeader: React.FC<Props> = ({ showLang = true, ...props }) => {
  const showHeader = Boolean(props.children || props.leftSlot || showLang);

  if (!showHeader) {
    return null;
  }

  const className = cn(styles.wrap, props.className);

  if (props.children) {
    return <div className={className}>{props.children}</div>;
  }

  return (
    <div className={cn(className, styles.row)}>
      {props.leftSlot}

      {showLang && (
        <div className={styles.lang}>
          <SelectedLangButton />
        </div>
      )}
    </div>
  );
};

export default AppHeader;

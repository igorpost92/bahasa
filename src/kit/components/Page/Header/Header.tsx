import React from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  showSeparator?: boolean;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  children?: React.ReactNode;
}

export const Header: React.FC<Props> = props => {
  const showTopRow = Boolean(props.left || props.center || props.right);
  const showHeader = Boolean(showTopRow || props.bottom);

  if (!showHeader) {
    return null;
  }

  const { showSeparator } = props;

  return (
    <div className={cn(styles.wrap, props.className, showSeparator && styles.separator)}>
      {showTopRow && (
        <div className={cn(styles.row, styles.topRow)}>
          <div className={styles.left}>{props.left}</div>
          {props.center && <h3 className={styles.center}>{props.center}</h3>}
          <div className={styles.right}>{props.right}</div>
        </div>
      )}

      {props.bottom && <div className={cn(styles.row, styles.bottomRow)}>{props.bottom}</div>}
    </div>
  );
};

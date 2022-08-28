import React from 'react';
import styles from './Radio.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
  isChecked?: boolean;
  onChange: () => void;
  label?: string;
}

const Radio: React.FC<Props> = props => {
  return (
    <div className={cn(styles.wrap, props.className)} onClick={props.onChange}>
      <div className={cn(styles.marker, props.isChecked && styles.checked)} />
      {props.label && <div className={styles.label}>{props.label}</div>}
    </div>
  );
};

export default Radio;
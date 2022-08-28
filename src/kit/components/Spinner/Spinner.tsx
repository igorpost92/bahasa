import React from 'react';
import styles from './Spinner.module.scss';
import { Spinner as SpinnerIcon } from '../../icons';
import cn from 'classnames';

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = props => {
  return <SpinnerIcon width={20} height={20} className={cn(styles.icon, props.className)} />;
};

export default Spinner;
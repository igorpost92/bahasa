import React from 'react';
import styles from './LangIcon.module.css';
import Flags from './flags';
import cn from 'classnames';

interface Props {
  className?: string;
  code: string;
}

const LangIcon: React.FC<Props> = props => {
  const Component = (Flags as any)[props.code];

  return <div className={cn(styles.wrap, props.className)}>{Component ? <Component /> : '-'}</div>;
};

export default LangIcon;

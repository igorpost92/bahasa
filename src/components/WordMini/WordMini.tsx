import React from 'react';
import styles from './WordMini.module.css';
import { WordTypes } from '../../storage/types';
import { Link } from 'react-router-dom';
import { Card, Tag } from '../../kit';
import cn from 'classnames';

interface Props {
  className?: string;
  text: string;
  meaning?: string;
  step?: number;
  tag?: string;
  url?: string; // TODO: rm
  onClick?: () => void;
}

const WordMini: React.FC<Props> = props => {
  const tagLabel = props.tag ? (props.tag === WordTypes.Adjective ? 'adj.' : props.tag) : null;

  const content = (
    <Card>
      <div className={styles.topRow}>
        <div className={styles.text}>{props.text}</div>
        {tagLabel && <Tag className={styles.tag}>{tagLabel}</Tag>}
        {!!props.step && <Tag className={styles.tag}>{props.step}</Tag>}
      </div>
      {props.meaning && <div className={styles.meaning}>{props.meaning}</div>}
    </Card>
  );

  const className = cn(styles.word, props.className);

  if (props.url) {
    return (
      <Link to={props.url} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={props.onClick} className={className}>
      {content}
    </div>
  );
};

export default WordMini;

import React from 'react';
import styles from './WordMini.module.scss';
import { Word, WordTypes } from '../../types';
import { Link } from 'react-router-dom';
import Card from '../../kit/components/Card/Card';

interface Props extends Pick<Word, 'text' | 'meaning' | 'step'> {
  type?: WordTypes;
  url?: string;
}

const WordMini: React.FC<Props> = props => {
  const typeLabel = props.type ? (props.type === WordTypes.Adjective ? 'adj.' : props.type) : null;

  const content = (
    <Card>
      <div className={styles.topRow}>
        <div className={styles.text}>{props.text}</div>
        {typeLabel && <div className={styles.tag}>{typeLabel}</div>}
        {!!props.step && <div className={styles.step}>{props.step}</div>}
      </div>
      <div className={styles.meaning}>{props.meaning}</div>
    </Card>
  );

  if (props.url) {
    return (
      <Link to={props.url} className={styles.word}>
        {content}
      </Link>
    );
  }

  return <div className={styles.word}>{content}</div>;
};

export default WordMini;

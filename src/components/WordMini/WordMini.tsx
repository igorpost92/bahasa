import React from 'react';
import styles from './WordMini.module.scss';
import { Word } from '../../types';
import { Link } from 'react-router-dom';

interface Props extends Pick<Word, 'text' | 'meaning' | 'step'>{
  url?: string
}

const WordMini: React.FC<Props> = (props) => {
  const content = (
    <>
      <div className={styles.topRow}>
        <div className={styles.text}>{props.text}</div>
        {!!props.step && (
          <div className={styles.step}>{props.step}</div>
        )}
      </div>
      <div className={styles.meaning}>{props.meaning}</div>
    </>
  )

  if (props.url) {
    return (
      <Link to={props.url} className={styles.word}>
        {content}
      </Link>
    )
  }

  return (
    <div className={styles.word}>
      {content}
    </div>
  );
};

export default WordMini;

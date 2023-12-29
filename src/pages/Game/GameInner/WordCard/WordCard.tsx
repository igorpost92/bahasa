import React from 'react';
import styles from './WordCard.module.css';
import ListenButton from '../../../../components/ListenButton/ListenButton';

interface Props {
  text: string;
  meaning: string;
  showAnswer: boolean;
}

const WordCard: React.FC<Props> = props => {
  return (
    <div className={styles.wrap}>
      <div className={styles.text}>{props.text}</div>

      {props.showAnswer && (
        <div>
          <div className={styles.answer}>{props.meaning}</div>
          <ListenButton text={props.meaning} className={styles.listenBtn} />
        </div>
      )}
    </div>
  );
};

export default WordCard;

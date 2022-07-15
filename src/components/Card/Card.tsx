import React from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';
import ListenButton from '../ListenButton/ListenButton';

interface Props {
  className?: string;
  text: string;
  meaning: string;
  showAnswer: boolean;
}

const Card: React.FC<Props> = (props) => {
  return (
    <div className={cn(props.className, styles.wrap)}>
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

export default Card;

import React, { useState } from 'react';
import styles from './GameInner.module.scss';
import { Word } from '../../../types';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import { useWordCards } from './useWordCards';
import { markWordAsRepeated } from '../../../api';

interface Props {
  words: Word[];
  invertedMode: boolean;
  globalRepeatMode?: boolean;
}

const GameInner: React.FC<Props> = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [counter, setCounter] = useState(0);
  const [wrongCounter, setWrongCounter] = useState(0);

  const cards = useWordCards(props.words, props.globalRepeatMode);

  let content;

  if (counter >= cards.length) {
    content = 'Done!';
  } else {
    const doShowAnswer = () => {
      setShowAnswer(true);
    };

    const currentWord = cards[counter];
    const text = !props.invertedMode ? currentWord.text : currentWord.meaning;
    const meaning = !props.invertedMode ? currentWord.meaning : currentWord.text;

    const goNext = () => {
      setCounter(counter + 1);
      setShowAnswer(false);
    };

    const onSuccess = () => {
      if (!props.globalRepeatMode) {
        markWordAsRepeated(currentWord.id, (currentWord.step ?? -1) + 1);
      }
      goNext();
    };

    const onWrong = () => {
      const step = currentWord.step ? currentWord.step - 1 : 0;
      markWordAsRepeated(currentWord.id, step);
      setWrongCounter(wrongCounter + 1);
      goNext();
    };

    content = (
      <>
        <Card
          className={styles.card}
          text={text}
          meaning={meaning}
          showAnswer={showAnswer}
        />

        <div className={styles.buttons}>
          {showAnswer ? (
            <>
              <Button size={'xl'} className={styles.btn} type={'success'} onClick={onSuccess}>Correct</Button>
              <Button size={'xl'} className={styles.btn} type={'danger'} onClick={onWrong}>Wrong</Button>
            </>
          ) : (
            <Button size={'xl'} className={styles.btn} onClick={doShowAnswer}>Show answer</Button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.status}>
        <div>
          {counter} / {cards.length}
        </div>

        <div>
          wrong: {wrongCounter}
        </div>
      </div>

      {content}
    </>
  );
};

export default GameInner;

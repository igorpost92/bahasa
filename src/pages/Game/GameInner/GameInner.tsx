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
}

type Step = 'question' | 'know' | 'dont know';

const GameInner: React.FC<Props> = (props) => {
  const [step, setStep] = useState<Step>('question');
  const [counter, setCounter] = useState(0);
  const [wrongCounter, setWrongCounter] = useState(0);

  const showAnswer = step !== 'question';

  const cards = useWordCards(props.words);

  let content;

  if (counter >= cards.length) {
    content = 'Done!';
  } else {
    const markToRepeat = () => {
      markWordAsRepeated(currentWord.id, (currentWord.step ?? 0));
      setWrongCounter(wrongCounter + 1);
    };

    const onClick = (flag: boolean) => {
      setStep(flag ? 'know' : 'dont know');

      if (!flag) {
        markToRepeat();
      }
    };

    const currentWord = cards[counter];
    const text = !props.invertedMode ? currentWord.text : currentWord.meaning;
    const meaning = !props.invertedMode ? currentWord.meaning : currentWord.text;

    const goNext = () => {
      setCounter(counter + 1);
      setStep('question');
    };

    const onSuccess = () => {
      markWordAsRepeated(currentWord.id, (currentWord.step ?? 0) + 1);
      goNext();
    };

    const onWrong = () => {
      markToRepeat();
      goNext();
    };

    let buttons;

    if (step === 'question') {
      buttons = (
        <>
          <Button size={'xl'} className={styles.btn} type={'success'} onClick={() => onClick(true)}>Yes</Button>
          <Button size={'xl'} className={styles.btn} type={'danger'} onClick={() => onClick(false)}>No</Button>
        </>
      );
    } else if (step === 'know') {
      buttons = (
        <>
          <Button size={'xl'} className={styles.btn} type={'success'} onClick={onSuccess}>Correct</Button>
          <Button size={'xl'} className={styles.btn} type={'danger'} onClick={onWrong}>Wrong</Button>
        </>
      );
    } else {
      buttons = (
        <Button size={'xl'} className={styles.btn} onClick={goNext}>Next</Button>
      );
    }

    content = (
      <>
        <Card
          className={styles.card}
          text={text}
          meaning={meaning}
          showAnswer={showAnswer}
        />

        <div className={styles.buttons}>
          {buttons}
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

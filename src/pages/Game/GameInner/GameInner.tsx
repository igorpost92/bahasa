import React, { useState } from 'react';
import styles from './GameInner.module.scss';
import { Word } from '../../../types';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import { useWordCards } from './useWordCards';
import { markWordAsRepeated } from '../../../api';
import WordMini from '../../../components/WordMini/WordMini';
import { useList } from '../../../hooks/useList';
import Refresh from '../../../icons/Refresh';

interface Props {
  words: Word[];
  invertedMode: boolean;
  globalRepeatMode?: boolean;
}

const GameInner: React.FC<Props> = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [counter, setCounter] = useState(0);

  const cards = useWordCards(props.words, props.globalRepeatMode);
  const [wrongWords, wrongWordsActions] = useList<Word>([]);

  let content;

  const goToPrevWord = () => {
    if (counter <= 0) {
      return;
    }

    const prevWord = cards[counter - 1];

    if (wrongWordsActions.has(prevWord)) {
      wrongWordsActions.remove(prevWord);
    } else if (!props.globalRepeatMode) {
      const step = prevWord.step ?? 0;
      markWordAsRepeated(prevWord.id, step);
    }

    setShowAnswer(false);
    setCounter(counter - 1);
  };

  if (counter >= cards.length) {
    content = (
      <div className={styles.resultWrap}>
        <div className={styles.doneLabel}>Done!</div>

        {!!wrongWords.length && (
          <>
            <div className={styles.repeatLabel}>Words to repeat again:</div>
            <div className={styles.repeatList}>
              {wrongWords.map(word => (
                <WordMini
                  key={word.id}
                  text={word.text}
                  meaning={word.meaning}
                  step={word.step}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.endStageButtons}>
          <Button fullWidth size={'l'} onClick={goToPrevWord}>
            <Refresh size={24} />
          </Button>
        </div>
      </div>
    );
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
      wrongWordsActions.add(currentWord);

      const step = currentWord.step ? currentWord.step - 1 : 0;
      markWordAsRepeated(currentWord.id, step);

      goNext();
    };

    content = (
      <>
        <Card className={styles.card} text={text} meaning={meaning} showAnswer={showAnswer} />

        <div className={styles.buttons}>
          {showAnswer ? (
            <>
              <Button size={'xl'} className={styles.btn} type={'danger'} onClick={onWrong}>
                Wrong
              </Button>
              <Button size={'xl'} className={styles.btn} type={'success'} onClick={onSuccess}>
                Correct
              </Button>
            </>
          ) : (
            <>
              <Button size={'xl'} className={styles.revertBtn} onClick={goToPrevWord}>
                <Refresh size={24} />
              </Button>
              <Button size={'xl'} className={styles.btn} onClick={doShowAnswer}>
                Show answer
              </Button>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.status}>
        <div>
          {counter} / {cards.length}
        </div>

        <div>wrong: {wrongWords.length}</div>
        </div>

      {content}
    </div>
  );
};

export default GameInner;

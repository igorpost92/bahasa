import React, { useState } from 'react';
import styles from './GameInner.module.css';
import WordCard from './WordCard/WordCard';
import { Button, RefreshIcon, SkipBackIcon, useList } from '../../../kit';
import { useWordCards } from './useWordCards';
import WordMini from '../../../components/WordMini/WordMini';
import { WordListEntry } from '../../../storage/types';
import { markWordAsRepeated } from '../../../storage/methods/words';

interface Props {
  words: WordListEntry[];
  invertedMode?: boolean;
  globalRepeatMode?: boolean;
}

const GameInner: React.FC<Props> = props => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [counter, setCounter] = useState(0);

  const cards = useWordCards(props.words, props.globalRepeatMode);
  const [wrongWords, wrongWordsActions] = useList<WordListEntry>([]);

  let content;

  const goToPrevWord = () => {
    if (counter <= 0) {
      return;
    }

    const prevWord = cards[counter - 1];

    if (wrongWordsActions.has(prevWord)) {
      wrongWordsActions.remove(prevWord);
    }

    markWordAsRepeated(prevWord.id, prevWord.step);

    setShowAnswer(false);
    setCounter(counter - 1);
  };

  if (!cards.length) {
    content = (
      <div className={styles.resultWrap}>
        <div className={styles.doneLabel}>
          <div>No words to repeat.</div>
          <div>Try a bit later</div>
        </div>
      </div>
    );
  } else if (counter >= cards.length) {
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
                  // todo need?
                  step={word.step ?? undefined}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.endStageButtons}>
          <Button fullWidth size={'l'} onClick={goToPrevWord}>
            <RefreshIcon />
          </Button>
        </div>
      </div>
    );
  } else {
    const doShowAnswer = () => {
      setShowAnswer(true);
    };

    const currentWord = cards[counter];
    const text = props.invertedMode ? currentWord.text : currentWord.meaning;
    const meaning = props.invertedMode ? currentWord.meaning : currentWord.text;

    const goNext = () => {
      setCounter(counter + 1);
      setShowAnswer(false);
    };

    const onSuccess = () => {
      let nextStep = props.globalRepeatMode ? currentWord.step : (currentWord.step ?? -1) + 1;
      markWordAsRepeated(currentWord.id, nextStep);
      goNext();
    };

    const onWrong = () => {
      wrongWordsActions.add(currentWord);

      const step = currentWord.step ? currentWord.step - 1 : 0;
      markWordAsRepeated(currentWord.id, step);

      goNext();
    };

    // TODO: next repeat interval

    content = (
      <div className={styles.card}>
        <WordCard text={text} meaning={meaning} showAnswer={showAnswer} />

        <div className={styles.buttons}>
          {showAnswer ? (
            <>
              <Button
                size={'xl'}
                variant="outline"
                className={styles.btn}
                intent={'danger'}
                onClick={onWrong}
              >
                Wrong
              </Button>
              <Button
                size={'xl'}
                variant="outline"
                className={styles.btn}
                intent={'success'}
                onClick={onSuccess}
              >
                Correct
              </Button>
            </>
          ) : (
            <>
              <Button
                size={'xl'}
                variant={'outline'}
                className={styles.revertBtn}
                onClick={goToPrevWord}
              >
                <SkipBackIcon />
              </Button>
              <Button variant="outline" size={'xl'} className={styles.btn} onClick={doShowAnswer}>
                Show answer
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {!!cards.length && (
        <div className={styles.status}>
          <div>
            {counter} / {cards.length}
          </div>

          <div>wrong: {wrongWords.length}</div>
        </div>
      )}

      {content}
    </div>
  );
};

export default GameInner;

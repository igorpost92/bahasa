import React, { useState } from 'react';
import styles from './VerbsRandom.module.scss';
import { useData } from './useData';
import BackButton from '../../components/BackButton/BackButton';
import { AppPage } from '../../components/AppPage/AppPage';
import { Button } from '../../kit';
import ListenButton from '../../components/ListenButton/ListenButton';
import cn from 'classnames';

interface Props {}

const emptyPlaceholder = '_____________';

const VerbsRandom: React.FC<Props> = props => {
  const words = useData();

  const [showAnswer, setShowAnswer] = useState(false);
  const [counter, setCounter] = useState(0);
  const [wrong, setWrong] = useState(0);

  const currentQuestion = words[counter];

  let content;

  if (currentQuestion) {
    const goNext = () => {
      if (showAnswer) {
        setShowAnswer(false);
        setCounter(counter + 1);
      } else {
        setShowAnswer(true);
      }
    };

    content = (
      <div className={styles.contentWrap} onClick={goNext}>
        <>
          <div className={styles.counter}>
            {counter} / {words.length}
          </div>

          <div className={styles.verb}>{currentQuestion.verb}</div>
          <ListenButton text={currentQuestion.verb} className={styles.listenBtn} />

          <div className={styles.card}>
            <div className={styles.pronoun}>{currentQuestion.pronoun}</div>
            <div className={styles.value}>
              {showAnswer ? currentQuestion.value : emptyPlaceholder}
            </div>

            <ListenButton
              text={currentQuestion.value}
              className={cn(styles.listenBtn, !showAnswer && styles.hidden)}
            />

            <div className={styles.time}>{currentQuestion.type}</div>
          </div>

          {/*tap to go next*/}

          {/*<Button onClick={goNext} className={styles.btn} size={'xl'}>*/}
          {/*  Next*/}
          {/*</Button>*/}
        </>
      </div>
    );
  } else {
    // todo
  }

  console.log(words);

  return (
    <AppPage showHeaderBorder={false} headerLeft={<BackButton />}>
      {content}
    </AppPage>
  );
};

export default VerbsRandom;

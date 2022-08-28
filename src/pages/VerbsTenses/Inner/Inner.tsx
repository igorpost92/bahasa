import React, { useMemo, useState } from 'react';
import styles from './Inner.module.scss';
import { shuffle } from '../../../utils/shuffle';
import { VerbData } from '../../../api/methods/verbs';
import VerbValue from '../VerbValue/VerbValue';
import Button from '../../../kit/components/Button/Button';

interface Props {
  words: VerbData[];
}

const titlesMap = {
  presente: 'Indicativo Presente',
  preterito: 'Indicativo Pretérito perfecto simple',
} as Record<string, string>;

const pronouns = [
  //
  'yo',
  'tú',
  'el/ella/Ud.',
  'nosotros',
  'vosotros',
  'ellos/ellas/Uds.',
];

const Inner: React.FC<Props> = props => {
  const words = useMemo(() => {
    // TODO: take level in account
    return shuffle(props.words);
  }, [props.words]);

  const [counter, setCounter] = useState(0);
  const currentWord = words[counter];

  const goPrev = () => {
    setCounter(counter <= 0 ? words.length - 1 : counter - 1);
  };

  const goNext = () => {
    setCounter(counter >= words.length - 1 ? 0 : counter + 1);
  };

  return (
    <div>
      <div className={styles.statusRow}>
        <div>
          {counter + 1} / {words.length}
        </div>

        <Button className={styles.prevBtn} size={'m'} onClick={goPrev}>
          prev
        </Button>
        <Button size={'m'} onClick={goNext}>
          next
        </Button>
      </div>

      <div className={styles.infinitive}>{currentWord.name}</div>

      <div key={String(counter)}>
        {Object.keys(titlesMap).map(key => {
          const title = titlesMap[key];

          return (
            <div key={key}>
              <div className={styles.tenseTitle}>{title}</div>

              {currentWord.data[key].map((item, idx) => (
                <VerbValue key={idx} title={pronouns[idx]} text={item} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inner;

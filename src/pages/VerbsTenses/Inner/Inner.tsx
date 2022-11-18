import React, { useState } from 'react';
import styles from './Inner.module.scss';
import { VerbEntryData } from '../../../storage/types';
import VerbValue from '../VerbValue/VerbValue';
import { Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';

interface Props {
  words: VerbEntryData[];
  onGoBack: () => void;
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
  const { words } = props;

  const [counter, setCounter] = useState(0);
  const currentWord = words[counter];

  const goPrev = () => {
    setCounter(counter <= 0 ? words.length - 1 : counter - 1);
  };

  const goNext = () => {
    setCounter(counter >= words.length - 1 ? 0 : counter + 1);
  };

  return (
    <AppPage
      headerLeft={<Button onClick={props.onGoBack}>Back</Button>}
      headerTitle={currentWord.name}
    >
      {words.length > 1 && (
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
      )}

      <div key={String(counter)}>
        {Object.keys(titlesMap).map(key => {
          const title = titlesMap[key];

          return (
            <div className={styles.tenseWrap} key={key}>
              <div className={styles.tenseTitle}>{title}</div>

              {currentWord.data[key].map((item, idx) => (
                <VerbValue key={idx} title={pronouns[idx]} text={item} />
              ))}
            </div>
          );
        })}
      </div>
    </AppPage>
  );
};

export default Inner;

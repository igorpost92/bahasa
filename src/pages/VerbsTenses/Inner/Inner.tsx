import React, { useState } from 'react';
import styles from './Inner.module.scss';
import { VerbEntryData } from '../../../storage/types';
import VerbValue from '../VerbValue/VerbValue';
import { Button } from '../../../kit';
import { AppPage } from '../../../components/AppPage/AppPage';
import { verbsConfigByKeys } from '../../../constants/verbsConfig';
import { isVerbReflexive } from '../../../utils/isVerbReflexive';

interface Props {
  words: VerbEntryData[];
  onGoBack: () => void;
}

const Inner: React.FC<Props> = props => {
  const { words } = props;

  const [counter, setCounter] = useState(0);
  const currentWord = words[counter];
  const isReflexive = isVerbReflexive(currentWord.name);

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
        {Object.keys(verbsConfigByKeys).map(key => {
          const config = verbsConfigByKeys[key];
          const pronouns = isReflexive ? config.pronouns.reflexive : config.pronouns.normal;
          const data = currentWord.data[key]?.slice(0, pronouns.length) ?? [];

          return (
            <div className={styles.tenseWrap} key={key}>
              <div className={styles.tenseTitle}>{config.title}</div>

              {data.map((item, idx) => (
                <VerbValue key={idx} title={pronouns[idx].title} text={item} />
              ))}
            </div>
          );
        })}
      </div>
    </AppPage>
  );
};

export default Inner;

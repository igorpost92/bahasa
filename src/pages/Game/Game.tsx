import React, { useState } from 'react';
import styles from './Game.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useWords } from '../../api/hooks/useWords';
import GameInner from './GameInner/GameInner';
import Page from '../../components/Page/Page';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  globalRepeatMode?: boolean;
}

const Game: React.FC<Props> = (props: Props) => {
  const { lang } = useCurrentLanguage();
  const [invertedMode, setInvertedMode] = useState(true);

  const { isLoading, data: words = [] } = useWords(lang);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <GameInner key={lang} words={words} invertedMode={invertedMode} globalRepeatMode={props.globalRepeatMode} />
    );
  }

  return (
    <Page
      showHeaderBorder={false}
      headerLeft={
        <div className={styles.linksWrap}>
          <Link to={'/'}>
            <Button>Words</Button>
          </Link>

          {/*<Button onClick={() => setInvertedMode(!invertedMode)}>*/}
          {/*  inverted: {invertedMode ? 'true' : 'false'}*/}
          {/*</Button>*/}
        </div>
      }
    >
      {content}
    </Page>
  );
};

export default Game;

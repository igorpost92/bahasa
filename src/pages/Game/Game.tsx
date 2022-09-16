import React from 'react';
import styles from './Game.module.scss';
import { Button } from '../../kit';
import { useWords } from '../../storage/hooks/words';
import GameInner from './GameInner/GameInner';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import { useLocation } from 'react-router-dom';

export interface GameLocationState {
  from?: string;
  categories?: string[];
  globalRepeatMode?: boolean;
  invertedMode?: boolean;
}

const Game: React.FC = () => {
  const state = (useLocation().state as GameLocationState) || {};

  const { lang } = useCurrentLanguage();

  const { isLoading, data } = useWords({ categories: state.categories });
  const words = data ?? [];

  let content;

  if (isLoading) {
    // content = <Spinner />;
  } else {
    content = (
      <GameInner
        key={lang}
        words={words}
        invertedMode={state.invertedMode}
        globalRepeatMode={state.globalRepeatMode}
      />
    );
  }

  return (
    <AppPage
      showHeaderBorder={false}
      headerLeft={
        // TODO:
        <>
          <Button url={state.from || '/learn'}>Back</Button>

          {/*<Button onClick={() => setInvertedMode(!invertedMode)}>*/}
          {/*  inverted: {invertedMode ? 'true' : 'false'}*/}
          {/*</Button>*/}
        </>
      }
    >
      {content}
    </AppPage>
  );
};

export default Game;

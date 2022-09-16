import React from 'react';
import styles from './Game.module.scss';
import { useWords } from '../../storage/hooks/words';
import GameInner from './GameInner/GameInner';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';

export interface GameLocationState {
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
    <AppPage showHeaderBorder={false} headerLeft={<BackButton />}>
      {content}
    </AppPage>
  );
};

export default Game;

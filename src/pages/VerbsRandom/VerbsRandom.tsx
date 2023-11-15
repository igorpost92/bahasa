import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import { AppPage } from '../../components/AppPage/AppPage';
import Settings from './Settings/Settings';
import Game from './Game/Game';
import { useLocalStorage } from '../../kit';
import { LocalStorageTokens } from '../../constants/localStorageTokens';

type Step = 'settings' | 'game';

const VerbsRandom: React.FC = () => {
  const [filteredTenses, setFilteredTenses] = useLocalStorage<string[]>(
    LocalStorageTokens.RandomConjugationSettings,
    [],
  );

  const [step, setStep] = useState<Step>('settings');

  let content;

  if (step === 'settings') {
    const onStart = (tenses: string[]) => {
      setFilteredTenses(tenses);
      setStep('game');
    };

    content = <Settings initialValue={filteredTenses} onSave={onStart} />;
  } else {
    content = <Game filteredTenses={filteredTenses} />;
  }

  return (
    <AppPage showHeaderBorder={false} headerLeft={<BackButton />}>
      {content}
    </AppPage>
  );
};

export default VerbsRandom;

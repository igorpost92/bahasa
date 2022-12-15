import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import { AppPage } from '../../components/AppPage/AppPage';
import Settings from './Settings/Settings';
import Game from './Game/Game';

type Step = 'settings' | 'game';

const VerbsRandom: React.FC = props => {
  const [filteredTenses, setFilteredTenses] = useState<string[]>([]);
  const [step, setStep] = useState<Step>('settings');

  let content;

  if (step === 'settings') {
    const onStart = (tenses: string[]) => {
      setFilteredTenses(tenses);
      setStep('game');
    };

    content = <Settings onStart={onStart} />;
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

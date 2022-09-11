import React from 'react';
import styles from './Game.module.scss';
import { Button, Spinner } from '../../kit';
import { useWords } from '../../storage/hooks/words';
import GameInner from './GameInner/GameInner';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';

interface Props {
  globalRepeatMode?: boolean;
}

const Game: React.FC<Props> = (props: Props) => {
  const { lang } = useCurrentLanguage();
  // const [invertedMode, setInvertedMode] = useState(true);

  const { isLoading, data } = useWords(false);

  const words = data ?? [];

  let content;

  if (isLoading) {
    // content = <Spinner />;
  } else {
    content = (
      <GameInner
        key={lang}
        words={words}
        invertedMode={true}
        globalRepeatMode={props.globalRepeatMode}
      />
    );
  }

  return (
    <AppPage
      showHeaderBorder={false}
      headerLeft={
        // TODO:
        <>
          <Button url={'/learn'}>Back</Button>

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

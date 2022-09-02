import React from 'react';
import styles from './Game.module.scss';
import { Button, Spinner } from '../../kit';
import { Link } from 'react-router-dom';
import { useWords } from '../../api/hooks/words/useWords';
import GameInner from './GameInner/GameInner';
import AppPage from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';

interface Props {
  globalRepeatMode?: boolean;
}

const Game: React.FC<Props> = (props: Props) => {
  const { lang } = useCurrentLanguage();
  // const [invertedMode, setInvertedMode] = useState(true);

  const { isLoading, data } = useWords();

  const words = data ?? [];

  let content;

  if (isLoading) {
    content = <Spinner />;
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
        <div className={styles.linksWrap}>
          <Link to={'/'}>
            <Button>Back</Button>
          </Link>

          {/*<Button onClick={() => setInvertedMode(!invertedMode)}>*/}
          {/*  inverted: {invertedMode ? 'true' : 'false'}*/}
          {/*</Button>*/}
        </div>
      }
    >
      {content}
    </AppPage>
  );
};

export default Game;

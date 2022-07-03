import React, { useState } from 'react';
import styles from './Game.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useWords } from '../../api/hooks/useWords';
import GameInner from './GameInner/GameInner';

const Game: React.FC = () => {
  const [invertedMode, setInvertedMode] = useState(true);

  const { isLoading, data: words = [] } = useWords();

  let content;

  if (isLoading) {
    content = 'Loading...';
  } else {
    content = (
      <GameInner words={words} invertedMode={invertedMode} />
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.linksWrap}>
        <Link to={'/'}>
          <Button>Words</Button>
        </Link>

        {/*<Button onClick={() => setInvertedMode(!invertedMode)}>*/}
        {/*  inverted: {invertedMode ? 'true' : 'false'}*/}
        {/*</Button>*/}
      </div>

      {content}
    </div>
  );
};

export default Game;
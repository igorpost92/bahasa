import React, { useState } from 'react';
import styles from './VerbValue.module.css';
import { useCurrentLanguage } from '../../../context/LanguageContext';
import { speak } from '../../../utils/speak';
import { Listen } from '../../../icons';

interface Props {
  title: string;
  text: string;
}

const VerbValue: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();
  const [isShown, setShown] = useState(false);

  const onClick = () => {
    if (isShown) {
      speak(props.text, lang);
    } else {
      setShown(true);
    }
  };

  return (
    <div className={styles.wrap} onClick={onClick}>
      <div className={styles.title}>{props.title}</div>

      <div className={styles.wordWrap}>
        {isShown ? (
          <>
            <div className={styles.speakBtn}>
              <Listen />
            </div>
            <div className={styles.text}>{props.text}</div>
          </>
        ) : (
          <div className={styles.showBtn}>Show</div>
        )}
      </div>
    </div>
  );
};

export default VerbValue;

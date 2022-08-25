import React from 'react';
import styles from './ListenButton.module.scss';
import { speak } from '../../utils/speak';
import cn from 'classnames';
import Listen from '../../icons/Listen';
import { useCurrentLanguage } from '../../context/LanguageContext';

interface Props {
  className?: string;
  text: string;
}

const ListenButton: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  return (
    <button onClick={() => speak(props.text, lang)} className={cn(props.className, styles.wrap)}>
      <Listen size={24} />
    </button>
  );
};

export default ListenButton;

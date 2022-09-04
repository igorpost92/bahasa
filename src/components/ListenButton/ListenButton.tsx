import React from 'react';
import styles from './ListenButton.module.scss';
import { speak } from '../../utils/speak';
import cn from 'classnames';
import { Listen } from '../../icons';
import { useCurrentLanguage } from '../../context/LanguageContext';

interface Props {
  className?: string;
  text: string | (() => string);
}

const ListenButton: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const handleClick = () => {
    const text = typeof props.text === 'string' ? props.text : props.text();
    speak(text, lang);
  };

  return (
    <button type={'button'} onClick={handleClick} className={cn(props.className, styles.wrap)}>
      <Listen width={24} height={24} />
    </button>
  );
};

export default ListenButton;

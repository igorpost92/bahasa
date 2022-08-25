import React from 'react';
import { useCurrentLanguage } from '../../../../context/LanguageContext';
import LangIcon from '../../../LangIcon/LangIcon';

interface Props {}

const SelectedLangButton: React.FC<Props> = props => {
  const { lang, openSelector } = useCurrentLanguage();

  return (
    <div onClick={openSelector}>
      <LangIcon code={lang} />
    </div>
  );
};

export default SelectedLangButton;

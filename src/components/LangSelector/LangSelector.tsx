import React from 'react';
import styles from './LangSelector.module.scss';
import { Drawer } from '../../kit';
import { useLanguages } from '../../storage/hooks/languages';
import LangIcon from '../LangIcon/LangIcon';
import cn from 'classnames';

interface Props {
  isOpen: boolean;
  // canClose?: boolean; todo
  onClose: () => void;
  selectedLang: string;
  onLangChange: (lang: string) => void;
}

const LangSelector: React.FC<Props> = props => {
  const languages = useLanguages();

  if (!props.isOpen) {
    return null;
  }

  return (
    <Drawer isOpen={props.isOpen} onClose={props.onClose}>
      <div className={styles.header}>Select language</div>
      <div className={styles.list}>
        {languages.map(lang => {
          const isSelected = lang.code === props.selectedLang;

          return (
            <div
              key={lang.code}
              className={cn(styles.lang, isSelected && styles.selected)}
              onClick={() => props.onLangChange(lang.code)}
            >
              <LangIcon className={styles.icon} code={lang.code} />
              <div>{lang.name}</div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default LangSelector;

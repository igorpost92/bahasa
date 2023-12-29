import React from 'react';
import styles from './LangSelector.module.css';
import { Drawer, usePromiseOnMount } from '../../kit';
import { useLanguages } from '../../storage/hooks/languages';
import LangIcon from '../LangIcon/LangIcon';
import cn from 'classnames';
import { db } from '../../storage/db';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedLang: string;
  onLangChange: (lang: string) => void;
}

const LangSelector: React.FC<Props> = props => {
  const languages = useLanguages();

  // TODO: put in settings
  const { data: isIndonesianEnabled } = usePromiseOnMount(async () => {
    const words = await db.words.where({ lang: 'ID' }).count();
    return words > 0;
  });

  return (
    <Drawer position={'bottom'} isOpen={props.isOpen} onClose={props.onClose}>
      <div className={styles.header}>Select language</div>
      <div className={styles.list}>
        {languages.map(lang => {
          const isSelected = lang.code === props.selectedLang;

          if (lang.code === 'ID' && !isIndonesianEnabled) {
            return null;
          }

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

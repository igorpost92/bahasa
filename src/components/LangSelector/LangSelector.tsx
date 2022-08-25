import React from 'react';
import styles from './LangSelector.module.scss';
import Drawer from '../Drawer/Drawer';
import { useLanguages } from '../../api/hooks/languages/useLanguages';
import LangIcon from '../LangIcon/LangIcon';
import cn from 'classnames';

interface Props {
  isOpen: boolean;
  canClose?: boolean;
  onClose: () => void;
  selectedLang: string;
  onLangChange: (lang: string) => void;
}

const LangSelector: React.FC<Props> = (props) => {
  const { isLoading, data } = useLanguages();

  if (!props.isOpen) {
    return null;
  }

  return (
    <Drawer isOpen={props.isOpen}>
      <div className={styles.header}>Select language</div>
      <div className={styles.list}>
        {(data ?? []).map((lang) => {
          const isSelected = lang.code === props.selectedLang

          return (
            <div className={cn(styles.lang, isSelected && styles.selected)} onClick={() => props.onLangChange(lang.code)}>
              <LangIcon className={styles.icon} code={lang.code} />
              <div>{lang.name}</div>
            </div>
          )
        })}
      </div>
    </Drawer>
  );
};

export default LangSelector;

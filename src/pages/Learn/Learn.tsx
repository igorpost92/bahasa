import React from 'react';
import styles from './Learn.module.scss';
import { AppPage, Button } from '../../kit';
import { useCurrentLanguage } from '../../context/LanguageContext';
import cn from 'classnames';

const Learn: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const isSpanish = lang === 'ES';

  return (
    <AppPage showTabBar headerTitle={'Learn'} contentClassName={styles.wrap}>
      <Button fullWidth intent={'success'} url={'/repeat'} className={styles.btnWrap}>
        Repeat
      </Button>

      <div className={cn(styles.btnWrap, !isSpanish && styles.disabledWrap)}>
        <Button fullWidth url={'/verbs'}>
          Verbs
        </Button>
        <div className={styles.info}>Only spanish supported at the moment</div>
      </div>

      <Button fullWidth url={'/global-repeat'} className={styles.btnWrap}>
        Full repeat
      </Button>
    </AppPage>
  );
};

export default Learn;

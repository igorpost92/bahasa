import React from 'react';
import styles from './Learn.module.scss';
import { Button } from '../../kit';
import { AppPage } from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import cn from 'classnames';

const Learn: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const isSpanish = lang === 'ES';

  return (
    <AppPage showTabBar headerTitle={'Learn'} contentClassName={styles.wrap}>
      <Button fullWidth intent={'primary'} url={'/repeat'} className={styles.btnWrap}>
        Repeat
      </Button>

      <div className={cn(styles.btnWrap, !isSpanish && styles.disabledWrap)}>
        <Button fullWidth url={'/verbs'}>
          Verbs
        </Button>
        <div className={styles.info}>Only spanish supported at the moment</div>
      </div>

      <div className={cn(styles.btnWrap, !isSpanish && styles.disabledWrap)}>
        <Button fullWidth url={'/verbs-random'}>
          Verbs (random)
        </Button>
        <div className={styles.info}>Only spanish supported at the moment</div>
      </div>

      <Button fullWidth url={'/full-repeat'} className={styles.btnWrap}>
        Full repeat
      </Button>
    </AppPage>
  );
};

export default Learn;

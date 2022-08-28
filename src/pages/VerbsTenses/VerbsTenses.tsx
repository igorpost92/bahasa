import React from 'react';
import styles from './VerbsTenses.module.scss';
import AppPage from '../../components/AppPage/AppPage';
import { Link } from 'react-router-dom';
import Button from '../../kit/components/Button/Button';
import Spinner from '../../kit/components/Spinner/Spinner';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Inner from './Inner/Inner';
import { useVerbTenses } from './useVerbTenses';

interface Props {}

const VerbsTenses: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, isError } = useVerbTenses();
  const words = data ?? [];

  let content;

  if (lang !== 'ES') {
    content = <div>Only spanish supported at the moment</div>;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>Unknown error</div>;
  } else if (!words.length) {
    content = <div>No verbs found in dictionary</div>;
  } else {
    content = <Inner words={words} />;
  }

  return (
    <AppPage
      showHeaderBorder={false}
      headerLeft={
        <div className={styles.linksWrap}>
          <Link to={'/'}>
            <Button>Back</Button>
          </Link>
        </div>
      }
    >
      {content}
    </AppPage>
  );
};

export default VerbsTenses;

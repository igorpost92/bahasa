import React, { useState } from 'react';
import styles from './VerbsTenses.module.scss';
import { AppPage } from '../../components/AppPage/AppPage';
import { Link } from 'react-router-dom';
import { Button, Spinner } from '../../kit';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Inner from './Inner/Inner';
import { useVerbTenses } from '../../api/hooks/verbs/useVerbTenses';
import VerbsList from './VerbsList/VerbsList';
import { VerbData } from '../../api/methods/verbs';

interface Props {}

const VerbsTenses: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, error } = useVerbTenses();
  const words = data ?? [];

  const [selectedData, setSelectedData] = useState<VerbData[]>();

  let content;

  if (lang !== 'ES') {
    content = <div>Only spanish supported at the moment</div>;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (!words.length) {
    content = <div>No verbs found in dictionary</div>;
  }

  if (content) {
    return (
      <AppPage
        showHeaderBorder={false}
        // TODO:
        // showLang={false}
        headerLeft={
          <Link to={'/'}>
            <Button>Back</Button>
          </Link>
        }
        headerTitle={'Verbs'}
      >
        {content}
      </AppPage>
    );
  }

  if (selectedData) {
    return <Inner words={selectedData} onGoBack={() => setSelectedData(undefined)} />;
  }

  return <VerbsList verbs={words} onSelect={setSelectedData} />;
};

export default VerbsTenses;

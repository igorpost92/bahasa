import React, { useState } from 'react';
import styles from './VerbsTenses.module.scss';
import AppPage from '../../components/AppPage/AppPage';
import { Link } from 'react-router-dom';
import Button from '../../kit/components/Button/Button';
import Spinner from '../../kit/components/Spinner/Spinner';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Inner from './Inner/Inner';
import { useVerbTenses } from './useVerbTenses';
import VerbsList from './VerbsList/VerbsList';
import { VerbData } from '../../api/methods/verbs';

interface Props {}

const VerbsTenses: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, isError } = useVerbTenses();
  const words = data ?? [];

  const [selectedData, setSelectedData] = useState<VerbData[]>();

  let content;

  if (lang !== 'ES') {
    content = <div>Only spanish supported at the moment</div>;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <div>Unknown error</div>;
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

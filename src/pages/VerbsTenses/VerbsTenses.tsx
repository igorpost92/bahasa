import React, { useState } from 'react';
import { AppPage } from '../../components/AppPage/AppPage';
import { SpinnerIcon } from '../../kit';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Inner from './Inner/Inner';
import { useVerbsTenses } from '../../storage/hooks/verbs';
import VerbsList from './VerbsList/VerbsList';
import { VerbEntryData } from '../../storage/types';
import BackButton from '../../components/BackButton/BackButton';

interface Props {}

const VerbsTenses: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const { isLoading, data, error } = useVerbsTenses();
  const words = data ?? [];

  const [selectedData, setSelectedData] = useState<VerbEntryData[]>();

  let content;

  if (lang !== 'ES') {
    content = <div>Only spanish supported at the moment</div>;
  } else if (isLoading) {
    content = <SpinnerIcon />;
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
        headerLeft={<BackButton />}
        headerTitle={'Verbs'}
      >
        {content}
      </AppPage>
    );
  }

  if (selectedData) {
    // todo modal
    return <Inner words={selectedData} onGoBack={() => setSelectedData(undefined)} />;
  }

  return <VerbsList verbs={words} onSelect={setSelectedData} />;
};

export default VerbsTenses;

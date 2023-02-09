import { createContext, useState, ReactNode, useMemo, useEffect, useContext } from 'react';
import { useLanguages } from '../storage/hooks/languages';
import { SpinnerIcon } from '../kit';
import LangSelector from '../components/LangSelector/LangSelector';
import { getCurrentLang, setCurrentLang } from '../storage/currentLang';

interface LanguageContextProps {
  lang: string;
  openSelector: () => void;
  setLang: (lang: string) => void;
}

// TODO: refacto

const defaultValue = {
  lang: '',
  openSelector: () => undefined,
  setLang: () => undefined,
};

const LanguageContext = createContext<LanguageContextProps>(defaultValue);

interface Props {
  children: ReactNode;
}

export const LanguageContextLayer = (props: Props) => {
  const [lang, setLang] = useState(getCurrentLang);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const languages = useLanguages();

  useEffect(() => {
    if (lang || !languages?.length) {
      return;
    }

    if (languages.length === 1) {
      setLang(languages[0].code);
      return;
    }

    setDrawerOpen(true);
  }, [lang, languages]);

  useEffect(() => {
    if (lang) {
      setCurrentLang(lang);
    }
  }, [lang]);

  const state = useMemo(
    () => ({
      lang,
      setLang,
      openSelector: () => setDrawerOpen(true),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={state}>
      {/*// TODO:why*/}
      {!lang ? <SpinnerIcon /> : props.children}

      <LangSelector
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedLang={lang}
        onLangChange={lang => {
          setLang(lang);
          setDrawerOpen(false);
        }}
      />
    </LanguageContext.Provider>
  );
};

export const useCurrentLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};

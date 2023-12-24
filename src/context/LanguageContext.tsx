import { createContext, useState, ReactNode, useMemo, useEffect, useContext } from 'react';
import LangSelector from '../components/LangSelector/LangSelector';
import { getCurrentLang, setCurrentLang } from '../storage/currentLang';

interface LanguageContextProps {
  lang: string;
  openSelector: () => void;
  setLang: (lang: string) => void;
}

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
  // TODO: useLocalStorage
  const [lang, setLang] = useState(getCurrentLang);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
      {props.children}

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

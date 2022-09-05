import { createContext, useState, ReactNode, useMemo, useEffect, useContext } from 'react';
import { useLanguages } from '../api/hooks/languages/useLanguages';
import { Spinner } from '../kit';
import LangSelector from '../components/LangSelector/LangSelector';

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

const localStorageKey = 'current-lang-code';

export const LanguageContextLayer = (props: Props) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(localStorageKey) ?? 'ES';
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { isLoading, data } = useLanguages();

  useEffect(() => {
    if (lang || !data?.length) {
      return;
    }

    // TODO: if empty

    if (data.length === 1) {
      setLang(data[0].code);
      return;
    }

    setDrawerOpen(true);
  }, [lang, data]);

  useEffect(() => {
    if (lang) {
      localStorage.setItem(localStorageKey, lang);
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
      {isLoading && !lang ? <Spinner /> : props.children}

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

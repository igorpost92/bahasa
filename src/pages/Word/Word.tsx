import React, { useEffect, useState } from 'react';
import styles from './Word.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useWord } from '../../api/hooks/useWord';
import Input from '../../kit/components/Input/Input';
import Button from '../../kit/components/Button/Button';
import { addWord, deleteWord, updateWord } from '../../api/methods/words';
import ListenButton from '../../components/ListenButton/ListenButton';
import AppPage from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../kit/components/Spinner/Spinner';
import { usePromise } from '../../hooks/usePromise';
import { WordTypes } from '../../types';
import Select from '../../kit/components/Select/Select';
import ControlGroup from '../../kit/components/ControlGroup/ControlGroup';

const wordTypes = [
  { value: WordTypes.Noun, name: WordTypes.Noun },
  { value: WordTypes.Verb, name: WordTypes.Verb },
  { value: WordTypes.Adjective, name: WordTypes.Adjective },
  { value: WordTypes.Phrase, name: WordTypes.Phrase },
];

const Word: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id == undefined;

  const [text, setText] = useState('');
  const [meaning, setMeaning] = useState('');
  const [wordType, setWordType] = useState<WordTypes>();

  const { isLoading, data } = useWord(id);

  useEffect(() => {
    if (data) {
      setText(data.text);
      setMeaning(data.meaning);
      setWordType(data.type ?? undefined);
    }
  }, [data]);

  const savingPromise = usePromise(async () => {
    if (!text || !meaning) {
      return;
    }

    let action;

    if (isNew) {
      action = () => addWord({ text, meaning, lang, type: wordType });
    } else {
      action = () => updateWord(id, { text, meaning, type: wordType });
    }

    const result = await action();

    if (result) {
      navigate('/words');
    } else {
      alert('error');
    }
  });

  const deletingPromise = usePromise(async () => {
    if (isNew) {
      return;
    }

    const res = confirm('Are you sure?');
    if (!res) {
      return;
    }

    const result = await deleteWord(id);
    if (result) {
      navigate('/words');
    } else {
      alert('error');
    }
  });

  useEffect(() => {
    if (savingPromise.isError || deletingPromise.isError) {
      alert('error');
    }
  }, [savingPromise.isError, deletingPromise.isError]);

  const content =
    !isNew && isLoading ? (
      <Spinner />
    ) : (
      <>
        <ControlGroup id={'text'} label={'Text'}>
          <Input value={text} onChange={setText} />
        </ControlGroup>

        <ControlGroup id={'meaning'} label={'Meaning'}>
          <Input value={meaning} onChange={setMeaning} />
        </ControlGroup>

        <ControlGroup id={'type'} label={'Type'}>
          <Select options={wordTypes} value={wordType} onChange={setWordType as any} />
        </ControlGroup>

        <div className={styles.btnWrap}>
          <ListenButton text={text} className={styles.listenBtn} />
        </div>
      </>
    );

  return (
    <AppPage
      headerLeft={
        <div className={styles.btnPanel}>
          <Link to="/">
            <Button>Back</Button>
          </Link>
          <Button
            type={'success'}
            onClick={savingPromise.send}
            isLoading={savingPromise.isLoading}
            isDisabled={deletingPromise.isLoading}
          >
            Save
          </Button>
          {!isNew && (
            <Button
              type={'danger'}
              onClick={deletingPromise.send}
              isLoading={deletingPromise.isLoading}
              isDisabled={savingPromise.isLoading}
            >
              Delete
            </Button>
          )}
        </div>
      }
    >
      {content}
    </AppPage>
  );
};

export default Word;

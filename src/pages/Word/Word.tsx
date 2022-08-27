import React, { useEffect, useState } from 'react';
import styles from './Word.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useWord } from '../../api/hooks/useWord';
import Input from '../../kit/components/Input/Input';
import Button from '../../kit/components/Button/Button';
import { addWord, deleteWord, updateWord } from '../../api';
import ListenButton from '../../components/ListenButton/ListenButton';
import AppPage from '../../components/AppPage/AppPage';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../kit/components/Spinner/Spinner';
import { usePromise } from '../../hooks/usePromise';

const Word: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id == undefined;

  const [text, setText] = useState('');
  const [meaning, setMeaning] = useState('');

  const { isLoading, data } = useWord(id);

  useEffect(() => {
    if (data) {
      setText(data.text);
      setMeaning(data.meaning);
    }
  }, [data]);

  const savingPromise = usePromise(async () => {
    if (!text || !meaning) {
      return;
    }

    let action;

    if (isNew) {
      action = () => addWord(text, meaning, lang);
    } else {
      action = () => updateWord(id, text, meaning);
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
        <label className={styles.field}>
          Text
          <Input className={styles.input} value={text} onChange={setText} />
        </label>

        <label className={styles.field}>
          Meaning
          <Input className={styles.input} value={meaning} onChange={setMeaning} />
        </label>

        <ListenButton text={text} className={styles.listenBtn} />
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

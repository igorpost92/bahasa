import React, { useEffect, useState } from 'react';
import styles from './Word.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useWord } from '../../api/hooks/useWord';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { addWord, deleteWord, updateWord } from '../../api';
import ListenButton from '../../components/ListenButton/ListenButton';
import Page from '../../components/Page/Page';
import { useCurrentLanguage } from '../../context/LanguageContext';
import Spinner from '../../components/Spinner/Spinner';

const Word: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id == undefined;

  const [text, setText] = useState('');
  const [meaning, setMeaning] = useState('');

  const { isLoading, data } = useWord(id);

  const [saveInProgress, setSaveInProgress] = useState(false);

  useEffect(() => {
    if (data) {
      setText(data.text);
      setMeaning(data.meaning);
    }
  }, [data]);

  const onSave = async () => {
    if (saveInProgress || !text || !meaning) {
      return;
    }

    setSaveInProgress(true);

    let action;

    if (isNew) {
      action = () => addWord(text, meaning, lang);
    } else {
      action = () => updateWord(id, text, meaning);
    }

    const result = await action();

    setSaveInProgress(false);

    if (result) {
      navigate('/words');
    } else {
      alert('error');
    }
  };

  const onDelete = async () => {
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
  };

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
    <Page
      headerLeft={
        <div className={styles.btnPanel}>
          <Link to="/">
            <Button>Back</Button>
          </Link>
          <Button type={'success'} onClick={onSave}>
            Save{' '}
            {saveInProgress && (
              <>
                (<Spinner />)
              </>
            )}
          </Button>
          <Button type={'danger'} onClick={onDelete}>
            Delete
          </Button>
        </div>
      }
    >
      {content}
    </Page>
  );
};

export default Word;

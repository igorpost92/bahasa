import React, { useEffect, useState } from 'react';
import styles from './Word.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useWord } from '../../api/hooks/useWord';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { addWord, deleteWord, updateWord } from '../../api';

const Word: React.FC = () => {
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

  const onSave = async () => {
    if (!text || !meaning) {
      return;
    }

    let action;

    if (isNew) {
      action = () => addWord(text, meaning);
    } else {
      action = () => updateWord(id, text, meaning);
    }

    const result = await action();
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

  return (
    <div className={styles.wrap}>
      <div className={styles.linksWrap}>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Button type={'success'} onClick={onSave}>Save</Button>
        <Button type={'danger'} onClick={onDelete}>Delete</Button>
      </div>

      <label className={styles.field}>
        Text
        <Input className={styles.input} value={text} onChange={setText} />
      </label>

      <label className={styles.field}>
        Meaning
        <Input className={styles.input} value={meaning} onChange={setMeaning} />
      </label>
    </div>
  );
};

export default Word;

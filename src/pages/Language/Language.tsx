import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Language.module.scss';
import { useLanguage } from '../../api/hooks/languages/useLanguage';
import { addLanguage } from '../../api/methods/languages';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Page from '../../components/Page/Page';

const Language: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id == undefined;

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const { isLoading, data } = useLanguage(id);

  const [saveInProgress, setSaveInProgress] = useState(false);

  useEffect(() => {
    if (data) {
      setCode(data.code);
      setName(data.name);
    }
  }, [data]);

  const onSave = async () => {
    if (saveInProgress || !code || !name) {
      return;
    }

    setSaveInProgress(true);

    let action;

    if (isNew) {
      action = () => addLanguage(code, name);
    } else {
      // TODO:
      alert('not ready');
      return;
      // action = () => updateWord(id, code.trim(), name.trim());
    }

    const result = await action();

    setSaveInProgress(false);

    if (result) {
      navigate('/languages');
    } else {
      alert('error');
    }
  };

  return (
    <Page
      showLang={false}
      headerLeft={
        <div className={styles.btnPanel}>
          <Link to="/languages">
            <Button>Back</Button>
          </Link>
          <Button type={'success'} onClick={onSave}>
            Save {saveInProgress && <span>(loading...)</span>}
          </Button>
          {/*<Button type={'danger'} onClick={onDelete}>Delete</Button>*/}
        </div>
      }
    >
      <label className={styles.field}>
        Code
        <Input className={styles.input} value={code} onChange={setCode} />
      </label>

      <label className={styles.field}>
        Name
        <Input className={styles.input} value={name} onChange={setName} />
      </label>
    </Page>
  );
};

export default Language;

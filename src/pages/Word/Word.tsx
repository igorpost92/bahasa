import React, { useEffect, useState } from 'react';
import styles from './Word.module.scss';
import { useParams } from 'react-router-dom';
import { useWord } from '../../api/hooks/words/useWord';
import Input from '../../kit/components/Input/Input';
import { addWord, deleteWord, updateWord } from '../../api/methods/words';
import ListenButton from '../../components/ListenButton/ListenButton';
import { useCurrentLanguage } from '../../context/LanguageContext';
import { WordTypes } from '../../types';
import Select from '../../kit/components/Select/Select';
import ControlGroup from '../../kit/components/ControlGroup/ControlGroup';
import ElementForm from '../../components/ElementForm/ElementForm';

const wordTypes = [
  { value: WordTypes.Noun, name: WordTypes.Noun },
  { value: WordTypes.Verb, name: WordTypes.Verb },
  { value: WordTypes.Adjective, name: WordTypes.Adjective },
  { value: WordTypes.Phrase, name: WordTypes.Phrase },
];

const Word: React.FC = () => {
  const { lang } = useCurrentLanguage();

  const params = useParams();
  const isNew = params.id === undefined;
  const id = Number(params.id);

  const [text, setText] = useState('');
  const [meaning, setMeaning] = useState('');
  const [wordType, setWordType] = useState<WordTypes>();

  const { isLoading, data, error } = useWord(id);

  useEffect(() => {
    if (data) {
      setText(data.text);
      setMeaning(data.meaning);
      setWordType(data.type ?? undefined);
    }
  }, [data]);

  const onSave = async () => {
    if (!text || !meaning) {
      // TODO: submit disabed
      throw new Error('no fields data');
    }

    let action;

    if (isNew) {
      action = () => addWord({ text, meaning, lang, type: wordType });
    } else {
      // TODO: dont show lang on existing
      action = () => updateWord(id, { text, meaning, type: wordType });
    }

    return action();
  };

  const onDelete = () => deleteWord(id);

  return (
    <ElementForm
      listUrl={'/words'}
      isNew={isNew}
      // todo
      isLoading={!isNew && isLoading}
      error={error}
      onSave={onSave}
      onDelete={onDelete}
    >
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
        {/*// TODO: move up*/}
        <ListenButton text={text} className={styles.listenBtn} />
      </div>
    </ElementForm>
  );
};

export default Word;

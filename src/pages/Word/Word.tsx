import React from 'react';
import styles from './Word.module.scss';
import { useParams } from 'react-router-dom';
import { Input, Select, ControlGroup, ElementForm } from '../../kit';
import { createWord, deleteWord, getWord, updateWord } from '../../api/methods/words';
import ListenButton from '../../components/ListenButton/ListenButton';
import { useCurrentLanguage } from '../../context/LanguageContext';
import { WordEntry, WordTypes, WordUsageExample } from '../../api/types';
import { useForm, Controller } from 'react-hook-form';
import Examples from './Examples/Examples';

const wordTypes = [
  { value: WordTypes.Noun, name: WordTypes.Noun },
  { value: WordTypes.Verb, name: WordTypes.Verb },
  { value: WordTypes.Adjective, name: WordTypes.Adjective },
  { value: WordTypes.Phrase, name: WordTypes.Phrase },
];

export interface DataPayload {
  text: string;
  meaning: string;
  type: WordTypes | null;
  examples: WordUsageExample[] | null;
}

const Word: React.FC = () => {
  const { lang } = useCurrentLanguage();

  // TODO: can move to Element form too, decide about string|number
  const params = useParams();
  const isNew = params.id === undefined;
  const id = Number(params.id);

  const {
    control,
    formState: { errors },
    ...form
  } = useForm<DataPayload>({
    defaultValues: {
      text: '',
      meaning: '',
      type: null,
      examples: [],
    },
  });

  const onDataLoaded = (data: WordEntry) => {
    form.reset({
      text: data.text,
      meaning: data.meaning,
      type: data.type,
      examples: data.examples ?? [],
    });
  };

  const onAdd = (data: DataPayload) => createWord({ ...data, lang });
  const onUpdate = (data: DataPayload) => updateWord(id, data);
  const onDelete = () => deleteWord(id);

  return (
    <ElementForm
      listUrl={'/words'}
      isNew={isNew}
      getData={() => getWord(id)}
      onDataLoaded={onDataLoaded}
      onSave={form.handleSubmit}
      onCreate={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    >
      <div className={styles.nameWrap}>
        <Controller
          control={control}
          rules={{ required: true }}
          name={'text'}
          render={({ field }) => (
            <ControlGroup
              className={'aaa'}
              id={field.name}
              label={'Text'}
              intent={errors.text && 'danger'}
              description={errors.text?.message || errors.text?.type}
            >
              <Input {...field} />
            </ControlGroup>
          )}
        />

        <ListenButton text={() => form.getValues('text')} className={styles.listenBtn} />
      </div>

      <Controller
        control={control}
        rules={{ required: true }}
        name={'meaning'}
        render={({ field }) => (
          <ControlGroup
            id={field.name}
            label={'Meaning'}
            intent={errors.meaning && 'danger'}
            description={errors.meaning?.message || errors.meaning?.type}
          >
            <Input {...field} />
          </ControlGroup>
        )}
      />

      <Controller
        control={control}
        name={'type'}
        render={({ field }) => (
          <ControlGroup id={field.name} label={'Type'}>
            <Select {...field} value={field.value || undefined} options={wordTypes} />
          </ControlGroup>
        )}
      />

      <Examples control={control} />
    </ElementForm>
  );
};

export default Word;

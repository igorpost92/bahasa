import React from 'react';
import styles from './Word.module.css';
import { ControlGroup, Drawer, ElementForm, Input, Select } from '../../kit';
import ListenButton from '../../components/ListenButton/ListenButton';
import { useCurrentLanguage } from '../../context/LanguageContext';
import { Controller, useForm } from 'react-hook-form';
import Examples from './Examples/Examples';
import { createWord, deleteWord, getWord, updateWord } from '../../storage/methods/words';
import { WordEntry, WordTypes } from '../../storage/types';
import { Modals, useModal } from '../useModals';

const wordTypes = [
  { value: WordTypes.Noun, name: WordTypes.Noun },
  { value: WordTypes.Verb, name: WordTypes.Verb },
  { value: WordTypes.Adjective, name: WordTypes.Adjective },
  { value: WordTypes.Adverb, name: WordTypes.Adverb },
  { value: WordTypes.Preposition, name: WordTypes.Preposition },
  { value: WordTypes.Pronoun, name: WordTypes.Pronoun },
  { value: WordTypes.Phrase, name: WordTypes.Phrase },
  { value: WordTypes.Idiom, name: WordTypes.Idiom },
];

export type DataPayload = Omit<WordEntry, 'id'>;

interface Props {
  id?: string | undefined;
  onClose: () => void;
}

const Word: React.FC<Props> = props => {
  const { lang } = useCurrentLanguage();

  const { id = '' } = props;
  const isNew = !id;

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
      // TODO: select in form
      categories: [],
    },
  });

  const onDataLoaded = (data: WordEntry) => {
    form.reset({
      text: data.text,
      meaning: data.meaning,
      type: data.type,
      examples: data.examples ?? [],
      categories: data.categories,
    });
  };

  // TODO:
  // created at
  // next repeat
  // reset progress

  const onCreate = (data: DataPayload) => createWord({ ...data, lang });
  const onUpdate = (data: DataPayload) => updateWord(id, data);
  const onDelete = () => deleteWord(id);

  return (
    <ElementForm
      title="Word"
      isNew={isNew}
      getData={() => getWord(id)}
      onDataLoaded={onDataLoaded}
      onClose={props.onClose}
      onSave={form.handleSubmit}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    >
      <div className={styles.nameWrap}>
        <Controller
          control={control}
          rules={{ required: true }}
          name={'text'}
          render={({ field: { ref, ...field } }) => (
            <ControlGroup
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
        render={({ field: { ref, ...field } }) => (
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
        render={({ field: { ref, ...field } }) => (
          <ControlGroup id={field.name} label={'Type'}>
            <Select {...field} value={field.value || undefined} options={wordTypes} />
          </ControlGroup>
        )}
      />

      <Examples control={control} />
    </ElementForm>
  );
};

const WordModalWrap = () => {
  const { isOpen, close, payload } = useModal(Modals.Word);

  return (
    // TODO: shared style
    <Drawer
      isOpen={isOpen}
      onClose={close}
      size={'xl'}
      position={'bottom'}
      className={styles.modalWrap}
    >
      <Word id={payload?.id} onClose={close} />
    </Drawer>
  );
};

export default WordModalWrap;

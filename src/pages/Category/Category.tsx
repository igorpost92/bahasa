import React from 'react';
import { useParams } from 'react-router-dom';
import { Input, ControlGroup, Button, ElementForm, Select } from '../../kit';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { CategoryEntry } from '../../storage/types';
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../../storage/methods/categories';
import { useWords } from '../../storage/hooks/words';
import styles from './Category.module.scss';
import WordMini from '../../components/WordMini/WordMini';

type DataPayload = Omit<CategoryEntry, 'id'>;

const Category: React.FC = () => {
  const wordsRequest = useWords({ sort: 'date-desc' });

  const { id = '' } = useParams();
  const isNew = !id;

  const { control, ...form } = useForm<DataPayload>({
    defaultValues: {
      name: '',
      words: [],
    },
  });

  const { fields: words, ...wordsMethods } = useFieldArray({ control, name: 'words' });

  const onDataLoaded = (data: CategoryEntry) => {
    form.reset({
      name: data.name,
      words: data.words,
    });
  };

  const onCreate = (data: DataPayload) => createCategory(data);
  const onUpdate = (data: DataPayload) => updateCategory(id, data);
  const onDelete = () => deleteCategory(id);

  const wordsOptions =
    wordsRequest.data?.map(item => ({
      value: String(item.id),
      name: item.text,
    })) ?? [];

  return (
    <ElementForm
      listUrl={'/categories'}
      isNew={isNew}
      getData={() => getCategory(id)}
      onDataLoaded={onDataLoaded}
      onSave={form.handleSubmit}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    >
      <Controller
        name={'name'}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ControlGroup id={field.name} label={'Name'}>
            <Input {...field} />
          </ControlGroup>
        )}
      />

      <Controller
        name={`words`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <ControlGroup id={field.name} className={styles.wordWrap}>
              <Select
                {...field}
                placeholder={'Add words'}
                className={styles.wordsSelector}
                value={field.value.map(item => item.word_id)}
                onChange={v => {
                  form.setValue(
                    'words',
                    v.map(word_id => ({ word_id })),
                  );
                }}
                options={wordsOptions}
                searchable
                multiple
              />
            </ControlGroup>
          );
        }}
      />

      {/*// TODO: styles */}
      {!!words.length && (
        <div className={styles.wordsSection}>
          <div>Words</div>
          {words.map((wordField, idx) => {
            const word = wordsRequest.data?.find(i => i.id === wordField.word_id);

            return (
              <div key={wordField.id} className={styles.wordRow}>
                <WordMini
                  text={word?.text ?? '—'}
                  meaning={word?.meaning}
                  className={styles.wordWrap}
                />

                <Button
                  size={'m'}
                  className={styles.deleteRowBtn}
                  onClick={() => wordsMethods.remove(idx)}
                >
                  x
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </ElementForm>
  );
};

export default Category;

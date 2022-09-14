import React from 'react';
import { Input, ControlGroup, Button, ElementForm, Select, Drawer } from '../../kit';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { CategoryEntry } from '../../storage/types';
import {
  createCategory,
  deleteCategory,
  getCategory,
  predefinedCategoriesConfig,
  updateCategory,
} from '../../storage/methods/categories';
import { useWords } from '../../storage/hooks/words';
import styles from './Category.module.scss';
import WordMini from '../../components/WordMini/WordMini';
import { Close } from '../../kit/icons';
import { Modals, useModal } from '../useModals';

type DataPayload = Omit<CategoryEntry, 'id'>;

interface Props {
  id?: string | undefined;
  onClose: () => void;
}

const Category: React.FC<Props> = props => {
  const wordsRequest = useWords({ sort: 'date-desc' });

  const { id = '' } = props;
  const isNew = !id;

  // TODO: refacto
  const isPredefined = Object.keys(predefinedCategoriesConfig).includes(id);

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
      isNew={isNew}
      getData={() => getCategory(id)}
      onDataLoaded={onDataLoaded}
      onClose={props.onClose}
      onSave={form.handleSubmit}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
      readOnly={isPredefined}
    >
      <Controller
        name={'name'}
        control={control}
        rules={{ required: true }}
        render={({ field: { ref, ...field } }) => (
          <ControlGroup id={field.name} label={'Name'}>
            <Input {...field} readOnly={isPredefined} />
          </ControlGroup>
        )}
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

                {!isPredefined && (
                  <Button
                    size={'m'}
                    className={styles.deleteRowBtn}
                    onClick={() => wordsMethods.remove(idx)}
                  >
                    <Close />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!isPredefined && (
        <Controller
          name={`words`}
          control={control}
          render={({ field: { ref, ...field } }) => {
            return (
              <ControlGroup id={field.name} className={styles.wordWrap}>
                <Select
                  {...field}
                  searchable
                  multiple
                  placeholder={'Add words'}
                  className={styles.wordsSelector}
                  options={wordsOptions}
                  value={field.value.map(item => item.word_id)}
                  onChange={value => {
                    // TODO:
                    // think of better way
                    // need to store prev orders

                    const newValue = value.map(word_id => {
                      const order_index = field.value.find(
                        word => word.word_id === word_id,
                      )?.order_index;

                      return { word_id, order_index };
                    });

                    form.setValue('words', newValue);
                  }}
                />
              </ControlGroup>
            );
          }}
        />
      )}
    </ElementForm>
  );
};

const CategoryModalWrap = () => {
  const { isOpen, close, payload } = useModal(Modals.Category);

  return (
    <Drawer isOpen={isOpen} onClose={close} size={'xl'} className={styles.modalWrap}>
      <Category id={payload?.id} onClose={close} />
    </Drawer>
  );
};

export default CategoryModalWrap;

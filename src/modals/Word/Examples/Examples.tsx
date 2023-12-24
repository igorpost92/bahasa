import React from 'react';
import styles from './Examples.module.css';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { DataPayload } from '../Word';
import { Button, ControlGroup, Input } from '../../../kit';
import ListenButton from '../../../components/ListenButton/ListenButton';
import { CloseIcon } from '../../../kit/icons';

interface Props {
  // TODO: extend only needed fields
  control: Control<DataPayload>;
}

const Examples: React.FC<Props> = props => {
  const { control } = props;

  const { fields, ...methods } = useFieldArray({ control, name: 'examples' });

  const addExample = () => {
    methods.append({ text: '', meaning: '' });
  };

  return (
    <>
      {!!fields.length && (
        <div>
          <div className={styles.blockTitle}>Examples</div>
          {fields.map((field, idx) => {
            const handleDelete = () => {
              if (field.text.trim() || field.meaning.trim()) {
                if (!confirm('Are you sure')) {
                  return;
                }
              }

              methods.remove(idx);
            };

            const getTextToSpeak = () => {
              // TODO: refacto
              const { text } = control._formValues.examples[idx];
              return text;
            };

            return (
              <div key={field.id} className={styles.example}>
                <div className={styles.fieldsWrap}>
                  <div className={styles.textWrap}>
                    <Controller
                      control={control}
                      name={`examples.${idx}.text`}
                      render={({ field: { ref, ...field } }) => (
                        <ControlGroup id={field.name}>
                          <Input {...field} placeholder={'Text'} />
                        </ControlGroup>
                      )}
                    />
                    <ListenButton text={getTextToSpeak} className={styles.listenBtn} />
                  </div>
                  <Controller
                    control={control}
                    name={`examples.${idx}.meaning`}
                    render={({ field: { ref, ...field } }) => (
                      <ControlGroup id={field.name}>
                        <Input {...field} placeholder={'Translation'} />
                      </ControlGroup>
                    )}
                  />
                </div>
                <Button size={'m'} className={styles.deleteBtn} onClick={handleDelete}>
                  <CloseIcon />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <Button fullWidth onClick={addExample}>
        Add example
      </Button>
    </>
  );
};

export default Examples;

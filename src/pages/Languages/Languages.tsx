import React from 'react';
import styles from './Languages.module.scss';
import { useLanguages } from '../../api/hooks/languages/useLanguages';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import LangIcon from '../../components/LangIcon/LangIcon';
import ListElement from '../../components/ListElement/ListElement';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';

interface Props {}

const Languages: React.FC<Props> = props => {
  const { isLoading, data } = useLanguages();

  let listData = data || [];

  return (
    <Page
      headerLeft={
        <div className={styles.btnPanel}>
          <Link to={'/'}>
            <Button>Back</Button>
          </Link>

          <Link to={'/languages/new'}>
            <Button type={'success'}>Add</Button>
          </Link>
        </div>
      }
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {listData.map(lang => (
            <Link to={String(lang.code)} key={lang.code} className={styles.langLink}>
              <ListElement className={styles.lang}>
                <LangIcon code={lang.code} />
                <div className={styles.langTitle}>{lang.name}</div>
              </ListElement>
            </Link>
          ))}

          {!listData.length && <div>No languages yet</div>}
        </div>
      )}
    </Page>
  );
};

export default Languages;

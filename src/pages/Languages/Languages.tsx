import React from 'react';
import styles from './Languages.module.scss';
import { useLanguages } from '../../api/hooks/languages/useLanguages';
import Button from '../../kit/components/Button/Button';
import { Link } from 'react-router-dom';
import LangIcon from '../../components/LangIcon/LangIcon';
import Card from '../../kit/components/Card/Card';
import AppPage from '../../components/AppPage/AppPage';
import Spinner from '../../kit/components/Spinner/Spinner';

interface Props {}

const Languages: React.FC<Props> = props => {
  const { isLoading, data } = useLanguages();

  let listData = data || [];

  return (
    <AppPage
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
              <Card className={styles.lang}>
                <LangIcon code={lang.code} />
                <div className={styles.langTitle}>{lang.name}</div>
              </Card>
            </Link>
          ))}

          {!listData.length && <div>No languages yet</div>}
        </div>
      )}
    </AppPage>
  );
};

export default Languages;

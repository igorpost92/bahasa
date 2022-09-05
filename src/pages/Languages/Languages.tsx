import React from 'react';
import styles from './Languages.module.scss';
import { useLanguages } from '../../api/hooks/languages/useLanguages';
import { Button, Card, Spinner } from '../../kit';
import { Link } from 'react-router-dom';
import LangIcon from '../../components/LangIcon/LangIcon';
import { AppPage } from '../../components/AppPage/AppPage';

interface Props {}

const Languages: React.FC<Props> = props => {
  const { isLoading, data } = useLanguages();

  let listData = data || [];

  return (
    <AppPage
      headerLeft={
        <>
          <Button url={'/'}>Back</Button>
          <Button url={'/languages/new'} intent={'success'}>
            Add
          </Button>
        </>
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

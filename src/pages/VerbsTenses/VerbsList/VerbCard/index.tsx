import React from 'react';
import styles from './style.module.scss';
import { Card, DownloadIcon } from '../../../../kit';

interface Props {
  name: string;
  meaning: string;
  noData?: boolean;
}

const VerbCard: React.FC<Props> = props => {
  return (
    <Card className={styles.wrap}>
      <div className={styles.textPart}>
        <div className={styles.name}>{props.name}</div>
        {props.meaning && <div className={styles.meaning}>{props.meaning}</div>}
      </div>
      {props.noData && (
        <div className={styles.icon}>
          <DownloadIcon />
        </div>
      )}
    </Card>
  );
};

export default VerbCard;

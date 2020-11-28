import React from 'react';
import styles from './detailcard.module.scss';

function DetailCard({ headerContent, bodyContent }) {
  return (
    <div className={styles.card}>
      {headerContent && <div className={styles.header}>{headerContent}</div>}
      <div className={styles.body}>{bodyContent}</div>
    </div>
  );
}

export default DetailCard;

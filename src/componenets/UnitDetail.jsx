import React from 'react';
import styles from './unitdetails.module.scss';

function UnitDetail({ unit }) {
  return (
    <div className={styles.container}>
      <img
        className={`${styles.unitImage} ${styles[unit.house]}`}
        src={`${process.env.PUBLIC_URL}/images/units/${unit.name}.jpg`}
        alt={unit.name}
      />
    </div>
  );
}

export default UnitDetail;

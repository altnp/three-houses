import React from 'react';
import DetailCard from './DetailCard';
import styles from './unitdetails.module.scss';

function UnitDetails({ unit }) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <img
          className={`${styles.unitImage} ${styles[unit.house]}`}
          src={`${process.env.PUBLIC_URL}/images/units/${unit.name}.jpg`}
          alt={unit.name}
        />
        <div className={styles.column}>
          <div className={styles.unitName}>{unit.displayName}</div>
          <label htmlFor="level">
            Lvl:
            <input type="text" id="level" />
          </label>
        </div>
      </div>
      <DetailCard headerContent="Classes" />
      <img className={styles.bgBanner} src={`${process.env.PUBLIC_URL}/images/houses/${unit.house}.png`} alt="" />
    </div>
  );
}

export default UnitDetails;

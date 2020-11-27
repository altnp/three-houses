import React from 'react';
import styles from './unitcard.module.scss';

function UnitCard({ unit: u, action, actionBtnContent }) {
  return (
    <div className={`${styles.unitCard} ${styles[u.house]}`}>
      <img src={`${process.env.PUBLIC_URL}/images/units/${u.name}.jpg`} draggable={false} alt={u.name} />
      <div className={styles.unitProps}>
        <div>{u.displayName}</div>
        {u.level && <div>{u.level}</div>}
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/images/houses/${u.house}.png`}
        className={styles.bgBanner}
        draggable={false}
        alt=""
      />
      {action && actionBtnContent && (
        <button className={`${styles.actionBtn}`} type="button" onClick={action}>
          {actionBtnContent}
        </button>
      )}
    </div>
  );
}

export default UnitCard;

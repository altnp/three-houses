import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './roster.module.scss';
import UnitCard from './UnitCard';

function Roster({ roster, onRequestEdit }) {
  return (
    <div className={styles.roster}>
      {roster.map((u) => (
        <NavLink to={`/roster/${u.name}`} activeClassName={styles.activeUnit} className={styles.unitLink}>
          <UnitCard unit={u} />
        </NavLink>
      ))}
      <button type="button" onClick={onRequestEdit} className={`${styles.addUnitBtn} material-icons`}>
        edit
      </button>
    </div>
  );
}

export default Roster;

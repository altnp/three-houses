import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './roster.module.scss';
import UnitCards from './UnitCard';

function Roster({ roster, onAddUnit }) {
  return (
    <div className={styles.roster}>
      {roster.map((u) => (
        <NavLink to={`/roster/${u.name}`} activeClassName={styles.activeUnit} className={styles.unitLink}>
          <UnitCards unit={u} />
        </NavLink>
      ))}
      <button type="button" onClick={onAddUnit} className={`${styles.addUnitBtn} material-icons`}>
        edit
      </button>
    </div>
  );
}

Roster.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  roster: PropTypes.array.isRequired,
  onAddUnit: PropTypes.func.isRequired,
};

export default Roster;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './roster.module.scss';

function Roster({ roster, onAddUnit }) {
  return (
    <div className={styles.roster}>
      {roster.map((u) => (
        <Link to={`/${u.name}`}>{u.name}</Link>
      ))}
      <button type="button" onClick={onAddUnit}>
        Add Unit
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

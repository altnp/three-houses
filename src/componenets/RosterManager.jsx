import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import * as uuid from 'uuid';
import useScreenSize, { SCREENSIZE } from '../hooks/useScreenSize';
import Roster from './Roster';
import UnitDetail from './UnitDetail';
import styles from './rostermanager.module.scss';
import modalStyles from './modal.module.scss';
import unitsJson from '../data/units.json';
import routes from '../routes';
import UnitCard from './UnitCard';

function RosterManager() {
  const screenSize = useScreenSize();
  const history = useHistory();
  const { id } = useParams();

  const initRosterId = localStorage.getItem('currentRosterId');
  let initRosterState = [];
  if (initRosterId) {
    initRosterState = JSON.parse(localStorage.getItem(initRosterId)) || [];
  }

  const [roster, setRoster] = useState(initRosterState);
  const baseUnits = unitsJson;
  const [rosterBuffer, setRosterBuffer] = useState([]);
  const addUnit = (unitName) => {
    setRosterBuffer((r) => [...r, baseUnits.filter((u) => u.name === unitName)[0]]);
  };
  const removeUnit = (unitName) => {
    setRosterBuffer((r) => r.filter((u) => u.name !== unitName));
  };

  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };
  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('mousedown', handleClick, false);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }

    return () => {};
  }, [modalOpen]);

  useEffect(() => {
    let rosterId = localStorage.getItem('currentRosterId');
    if (!rosterId) {
      rosterId = uuid.v4();
      localStorage.setItem('currentRosterId', rosterId);
    }

    localStorage.setItem(rosterId, JSON.stringify(roster));
  }, [roster]);

  const detailOpen = id && screenSize !== SCREENSIZE.DESKTOP;
  const selectedUnit = id && roster.find((ru) => ru.name === id);

  if (modalOpen && detailOpen) {
    setModalOpen(false);
  }

  if (id && !selectedUnit) {
    history.push(routes.home);
  }

  return (
    <div className={`${styles.masterDetail} ${detailOpen ? styles.detailOpen : ''}`}>
      <div className={styles.master}>
        <Roster
          onAddUnit={() => {
            setRosterBuffer(roster);
            setModalOpen(true);
          }}
          onUnitRemove={removeUnit}
          roster={roster}
        />
      </div>

      <div className={styles.detail}>
        {screenSize !== SCREENSIZE.DESKTOP && (
          <div className={styles.detailHeader}>
            <button type="button" onClick={() => history.push(routes.home)} className={styles.iconBtnBack}>
              <span className="material-icons">keyboard_arrow_left</span>
              <span>
                <b>Roster</b>
              </span>
            </button>
          </div>
        )}
        {selectedUnit && <UnitDetail unit={selectedUnit} />}
      </div>

      <div className={`${modalStyles.modal} ${modalOpen ? modalStyles.modalOpen : ''}`} aria-hidden="true">
        <div ref={modalRef} className={modalStyles.modalContent} onClick={(e) => e.preventDefault()} aria-hidden="true">
          <button
            type="button"
            className={`material-icons ${modalStyles.iconBtn} ${modalStyles.closeBtn}`}
            onClick={() => setModalOpen(false)}
          >
            close
          </button>
          <ul className={styles.unitList}>
            Roster:
            {rosterBuffer.map((u) => (
              <li key={u.name}>
                <UnitCard
                  unit={u}
                  actionBtnContent={<span className={`material-icons ${styles.iconBtn}`}>close</span>}
                  action={() => removeUnit(u.name)}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.unitList}>
            Available Units:
            {baseUnits
              .filter((u) => !rosterBuffer.some((ru) => ru.name === u.name))
              .map((u) => (
                <li key={u.name} aria-hidden="true">
                  <UnitCard
                    unit={u}
                    actionBtnContent={<span className={`material-icons ${styles.iconBtn}`}>add</span>}
                    action={() => addUnit(u.name)}
                  />
                </li>
              ))}
          </ul>
          <button
            type="submit"
            className={styles.btn}
            onClick={() => {
              setRoster(rosterBuffer);
              setModalOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RosterManager;

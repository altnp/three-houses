import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import useScreenSize, { SCREENSIZE } from '../hooks/useScreenSize';
import Roster from './Roster';
import UnitDetail from './UnitDetail';
import styles from './rostermanager.module.scss';
import modalStyles from './modal.module.scss';
import unitsJson from '../data/units.json';

function RosterManager() {
  const screenSize = useScreenSize();
  const history = useHistory();
  const { id } = useParams();

  const [roster, setRoster] = useState([]);
  const baseUnits = unitsJson;
  const addUnit = (unitName) => {
    setRoster((r) => [...r, baseUnits.filter((u) => u.name === unitName)[0]]);
  };
  const removeUnit = (unitName) => {
    setRoster((r) => r.filter((u) => u.name !== unitName));
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

  const detailOpen = id && screenSize === SCREENSIZE.MOBILE;
  const selectedUnit = id && roster.find((ru) => ru.name === id);

  return (
    <div className={`${styles.masterDetail} ${detailOpen ? styles.detailOpen : ''}`}>
      <div className={styles.master}>
        <Roster onAddUnit={() => setModalOpen(true)} onUnitRemove={removeUnit} roster={roster} />
      </div>

      <div className={styles.detail}>
        {screenSize === SCREENSIZE.MOBILE && (
          <button type="button" onClick={() => history.push('/')} className={styles.iconBtn}>
            <span className="material-icons">keyboard_arrow_left</span>
            <span>
              <b>Units</b>
            </span>
          </button>
        )}
        <UnitDetail unit={selectedUnit} />
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
          <ul>
            Roster:
            {roster.map((u) => (
              <li key={u.name}>{u.name}</li>
            ))}
          </ul>
          <ul>
            Available Units:
            {baseUnits
              .filter((u) => !roster.some((ru) => ru.name === u.name))
              .map((u) => (
                <li key={u.name} onClick={() => addUnit(u.name)} aria-hidden="true">
                  {u.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RosterManager;

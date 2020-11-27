import React, { useEffect, useRef, useState } from 'react';
import modalStyles from './modal.module.scss';
import unitsJson from '../data/units.json';
import styles from './editrostermodal.module.scss';
import UnitCard from './UnitCard';

function EditRosterModal({ open, onRequestClose, roster, onRosterEdit }) {
  const baseUnits = unitsJson;

  const [rosterBuffer, setRosterBuffer] = useState(roster);
  useEffect(() => setRosterBuffer(roster), [roster]);

  const addUnit = (unitName) => {
    setRosterBuffer((r) => [...r, baseUnits.filter((u) => u.name === unitName)[0]]);
  };
  const removeUnit = (unitName) => {
    setRosterBuffer((r) => r.filter((u) => u.name !== unitName));
  };

  const modalRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        onRequestClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClick, false);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }

    return () => {};
  }, [open, onRequestClose]);

  return (
    <div className={`${modalStyles.modal} ${open ? modalStyles.modalOpen : ''}`} aria-hidden="true">
      <div ref={modalRef} className={modalStyles.modalContent} onClick={(e) => e.preventDefault()} aria-hidden="true">
        <button
          type="button"
          className={`material-icons ${modalStyles.iconBtn} ${modalStyles.closeBtn}`}
          onClick={() => onRequestClose()}
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
            onRosterEdit(rosterBuffer);
            onRequestClose();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditRosterModal;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import * as uuid from 'uuid';
import useScreenSize, { SCREENSIZE } from '../hooks/useScreenSize';
import Roster from './Roster';
import UnitDetails from './UnitDetails';
import styles from './rostermanager.module.scss';
import routes from '../routes';
import EditRosterModal from './EditRosterModal';

function RosterManager() {
  const screenSize = useScreenSize();
  const history = useHistory();
  const { id } = useParams();

  const initRosterId = localStorage.getItem('currentRosterId');
  let initRosterState = [];
  if (initRosterId) {
    initRosterState = JSON.parse(localStorage.getItem(initRosterId) || '[]');
  }

  const [roster, setRoster] = useState(initRosterState);

  useEffect(() => {
    let rosterId = localStorage.getItem('currentRosterId');
    if (!rosterId) {
      rosterId = uuid.v4();
      localStorage.setItem('currentRosterId', rosterId);
    }

    localStorage.setItem(rosterId, JSON.stringify(roster));
  }, [roster]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const detailOpen = id && screenSize !== SCREENSIZE.DESKTOP;
  const selectedUnit = id && roster.find((ru) => ru.name === id);

  if (id && !selectedUnit) {
    history.push(routes.home);
  }

  if (modalOpen && detailOpen) {
    setModalOpen(false);
  }
  return (
    <div className={`${styles.masterDetail} ${detailOpen ? styles.detailOpen : ''}`}>
      <div className={styles.master}>
        <Roster roster={roster} onRequestEdit={() => setModalOpen(true)} />
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
        {selectedUnit && <UnitDetails unit={selectedUnit} />}
      </div>

      <EditRosterModal
        open={modalOpen}
        roster={roster}
        onRosterEdit={(r) => setRoster(r)}
        onRequestClose={handleClose}
      />
    </div>
  );
}

export default RosterManager;

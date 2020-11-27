import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import styles from './nav.module.scss';
import useScreenSize, { SCREENSIZE } from '../hooks/useScreenSize';
import routes from '../routes';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const slideMenuRef = useRef();
  const handleClick = (e) => {
    if (!slideMenuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  const screenSize = useScreenSize();
  if (screenSize === SCREENSIZE.DESKTOP && menuOpen) {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClick, false);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }

    return () => {};
  }, [menuOpen]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  const ToggleLink = (props) => <NavLink {...props} onClick={() => setMenuOpen(false)} />;

  return (
    <>
      <nav className={styles.topNav}>
        <button type="button" className={`material-icons ${styles.menuBtn}`} onClick={() => setMenuOpen(true)}>
          menu
        </button>
        <NavLink to={routes.home}>
          <img src="/images/three-houses-logo.png" alt="three houses app" className={styles.navImg} />
        </NavLink>
        <NavLink to={routes.about}>About</NavLink>
      </nav>
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayDisplayed : ''}`} />
      <div ref={slideMenuRef} className={`${styles.sideNav} ${menuOpen ? styles.sideNavOpen : ''}`}>
        <button type="button" className={`material-icons ${styles.closeBtn}`} onClick={() => setMenuOpen(false)}>
          close
        </button>
        <ToggleLink to={routes.home}>Home</ToggleLink>
        <ToggleLink to={routes.about}>About</ToggleLink>
      </div>
    </>
  );
}

export default Nav;

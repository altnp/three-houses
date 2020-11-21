import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './nav.module.scss';

function Nav(props) {
  // eslint-disable-next-line no-unused-vars
  const { helloText, worldText } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const divRef = useRef();
  const handleClick = (e) => {
    if (!divRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClick, false);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }

    return () => {};
  }, [menuOpen]);

  // eslint-disable-next-line react/prop-types
  const ToggleLink = ({ to, children }) => (<Link to={to} onClick={toggleMenu}>{children}</Link>);

  return (
    <>
      <nav className={styles.topNav}>
        <button type="button" className={`material-icons ${styles.menuBtn}`} onClick={() => toggleMenu()}>menu</button>
        <Link to="/hello">
          <img src="/images/three-houses-logo.png" alt="three houses app" className={styles.navImg} />
        </Link>
        <Link to="/about">About</Link>

      </nav>
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayDisplayed : ''}`} />
      <div ref={divRef} className={`${styles.sideNav} ${menuOpen ? styles.sideNavOpen : ''}`}>
        <ToggleLink to="/about">About</ToggleLink>
      </div>
    </>
  );
}

Nav.propTypes = {
  helloText: PropTypes.string.isRequired,
  worldText: PropTypes.string.isRequired,
};

export default Nav;

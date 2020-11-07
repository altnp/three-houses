import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import routes from '../routes';

function Nav(props) {
  const { helloText, worldText } = props;

  return (
    <div>
      <Link to={routes.hello}>{helloText}</Link>
      <Link to={routes.world}>{worldText}</Link>
    </div>
  );
}

Nav.propTypes = {
  helloText: PropTypes.string.isRequired,
  worldText: PropTypes.string.isRequired,
};

export default Nav;

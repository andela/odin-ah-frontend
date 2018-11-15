import React from 'react';
import PropTypes from 'prop-types';

import NavBarDefault from './NavBarDefault';
import './NavBar.scss';

const propTypes = {
  userIsAuthenticated: PropTypes.bool
};

const defaultProps = {
  userIsAuthenticated: false
};

export default class NavBarContainer extends React.Component {
  render() {
    return <NavBarDefault {...this.props} />;
  }
}

NavBarContainer.propTypes = propTypes;
NavBarContainer.defaultProps = defaultProps;

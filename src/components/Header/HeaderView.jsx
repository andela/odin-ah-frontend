import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import './Header.scss';

const HeaderView = ({ isAuthenticated, navBurgerIsActive, handleBurgerClick }) => {
  const navBarProps = { isAuthenticated, navBurgerIsActive, handleBurgerClick };
  return <NavBar {...navBarProps} />;
};

HeaderView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navBurgerIsActive: PropTypes.bool,
  handleBurgerClick: PropTypes.func
};

export default HeaderView;

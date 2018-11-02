import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import './Header.scss';

const HeaderView = ({
  isAuthenticated, navBurgerIsActive, handleBurgerClick, handleLoginClick, showLoginModal, handleLoginCloseClick
}) => {
  const navBarProps = {
    isAuthenticated,
    navBurgerIsActive,
    handleBurgerClick,
    handleLoginClick,
    showLoginModal,
    handleLoginCloseClick
  };
  return <NavBar {...navBarProps} />;
};

HeaderView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navBurgerIsActive: PropTypes.bool,
  handleBurgerClick: PropTypes.func,
  showLoginModal: PropTypes.bool.isRequired,
  handleLoginCloseClick: PropTypes.func.isRequired
};

export default HeaderView;

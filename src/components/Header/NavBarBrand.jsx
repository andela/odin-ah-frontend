import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NAVBAR_BURGER_BASE_CLASS = 'navbar-burger burger';
const NAVBAR_BURGER_ACTIVE_CLASS = `${NAVBAR_BURGER_BASE_CLASS} is-active`;

const NavBarBrand = ({ navBurgerIsActive, handleBurgerClick }) => (
  <div className="navbar-brand">
    <Link className="navbar-item has-text-weight-bold" to="/">
      Authors Haven
    </Link>
    <Link
      role="button"
      to="#"
      className={navBurgerIsActive ? NAVBAR_BURGER_ACTIVE_CLASS : NAVBAR_BURGER_BASE_CLASS}
      aria-label="menu"
      aria-expanded="false"
      data-target="mobileMenu"
      onClick={handleBurgerClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </Link>
  </div>
);

NavBarBrand.propTypes = {
  handleBurgerClick: PropTypes.func,
  navBurgerIsActive: PropTypes.bool
};

NavBarBrand.defaultProps = {
  navBurgerIsActive: false
};

export default NavBarBrand;

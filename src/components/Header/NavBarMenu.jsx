import React from 'react';
import PropTypes from 'prop-types';

const NAVBAR_MENU_BASE_CLASS = 'navbar-menu';
const NAVBAR_MENU_SHOW_CLASS = `${NAVBAR_MENU_BASE_CLASS} is-active`;

const NavBarMenu = ({ children, mobileMode }) => (
  <div id="mobileMenu" className={mobileMode ? NAVBAR_MENU_SHOW_CLASS : NAVBAR_MENU_BASE_CLASS}>
    <div className="navbar-end">{children}</div>
  </div>
);

NavBarMenu.propTypes = {
  children: PropTypes.array,
  mobileMode: PropTypes.bool
};

export default NavBarMenu;

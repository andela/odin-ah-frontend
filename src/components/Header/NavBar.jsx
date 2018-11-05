import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchView from './SearchView';
import NavBarBrand from './NavBarBrand';
import NavBarMenu from './NavBarMenu';

const NavBar = ({ isAuthenticated, navBurgerIsActive, handleBurgerClick }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <NavBarBrand {...{ navBurgerIsActive, handleBurgerClick }} />
    <NavBarMenu mobileMode={navBurgerIsActive}>
      {isAuthenticated && (
        <React.Fragment>
          <div className="navbar-item">
            <SearchView />
          </div>
          <div className="navbar-item">
            <span className="icon is-medium navbar-icon">
              <i className="far fa-bookmark fa-2x" />
            </span>
          </div>
          <div className="navbar-item">
            <span className="icon is-medium navbar-icon">
              <i className="far fa-bell fa-2x" />
            </span>
          </div>
          <div className="navbar-item">
            <figure className="image is-48x48">
              <img className="is-rounded" src="https://picsum.photos/200" alt="User avatar" />
            </figure>
          </div>
        </React.Fragment>
      )}
      {!isAuthenticated && (
        <React.Fragment>
          <div className="navbar-item">
            <SearchView />
          </div>
          <div className="navbar-item">
            <Link className="button is-light" to="/login">
              Log in
            </Link>
          </div>
          <div className="navbar-item">
            {/* <div className="buttons"> */}
            <Link className="button is-primary" to="/signup">
              <strong>Sign up</strong>
            </Link>
          </div>
        </React.Fragment>
      )}
    </NavBarMenu>
  </nav>
);

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navBurgerIsActive: PropTypes.bool
};

NavBar.defaultProps = {
  navBurgerIsActive: false
};

export default NavBar;

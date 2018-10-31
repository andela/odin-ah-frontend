import React from 'react';
import PropTypes from 'prop-types';
import SearchView from './SearchView';
import NavBarBrand from './NavBarBrand';
import NavBarMenu from './NavBarMenu';
import LoginModal from '../login/LoginModal';

const NavBar = ({
  isAuthenticated,
  navBurgerIsActive,
  handleBurgerClick,
  openRegisterModal,
  handleLoginClick,
  showLoginModal,
  handleLoginCloseClick
}) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <NavBarBrand {...{
      navBurgerIsActive,
      handleBurgerClick
    }} />
    <NavBarMenu mobileMode={navBurgerIsActive}>
      {isAuthenticated && (
        <React.Fragment>
          <div className="navbar-item">
            <SearchView/>
          </div>
          <div className="navbar-item">
            <span className="icon is-medium navbar-icon">
              <i className="far fa-bookmark fa-2x"/>
            </span>
          </div>
          <div className="navbar-item">
            <span className="icon is-medium navbar-icon">
              <i className="far fa-bell fa-2x"/>
            </span>
          </div>
          <div className="navbar-item">
            <figure className="image is-48x48">
              <img className="is-rounded" src="https://picsum.photos/200" alt="User avatar"/>
            </figure>
          </div>
        </React.Fragment>
      )}
      {!isAuthenticated && (
        <React.Fragment>
          <div className="navbar-item">
            <SearchView/>
          </div>
          <div className="navbar-item">
            <button className="button is-light" onClick={handleLoginClick}>
              Log in
            </button>
            <LoginModal show={showLoginModal} close={handleLoginCloseClick}/>
          </div>
          <div className="navbar-item">
            {/* <div className="buttons"> */}
            <button id={'signupBtn'} onClick={openRegisterModal} className="button is-primary">
              <strong>Sign up</strong>
            </button>
          </div>
        </React.Fragment>
      )}
    </NavBarMenu>
  </nav>
);

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navBurgerIsActive: PropTypes.bool,
  openRegisterModal: PropTypes.func,

};

NavBar.defaultProps = {
  navBurgerIsActive: false
};

export default NavBar;

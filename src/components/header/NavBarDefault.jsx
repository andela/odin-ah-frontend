import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBarDefault = ({
  handleLogin, handleSignup, userIsAuthenticated, handleLogout,
}) => (
  <nav className="nav-bar">
    <div className="nav-bar__container">
      <div className="nav-bar__logo"/>
      <div className="nav-bar__menu--right">
        {!userIsAuthenticated && (
          <React.Fragment>
            <div
              className="btn btn--link text--primary sign-in-btn sign-in-btn-js"
              onClick={handleLogin}
            >
              Sign In
            </div>
            <div className="btn btn--primary sign-up-btn-js" onClick={handleSignup}>
              Sign Up
            </div>
          </React.Fragment>
        )}
        {userIsAuthenticated && (
          <React.Fragment>
            <Link
              className="btn btn--link text--primary sign-in-btn sign-in-btn-js"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <div className="btn btn--primary sign-up-btn-js" onClick={handleLogout}>
              Log Out
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  </nav>
);

NavBarDefault.propTypes = {
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  handleLogout: PropTypes.func,
  handleDashboardPage: PropTypes.func,
  userIsAuthenticated: PropTypes.bool
};

export default NavBarDefault;

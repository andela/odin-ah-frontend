import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import SearchDropDown from '../navbar/search/SearchDropDown';
import DropDown from '../inAppNotification/notification/dropDown';
import avatar from '../../profile-avatar.svg';

const NavBarDefault = ({
  handleLogin,
  toggleProfileMenu,
  profileMenuIsActive,
  handleSignup,
  userIsAuthenticated,
  handleLogout
}) => (
  <nav className="nav-bar">
    <div className="nav-bar__container">
      <Link to={'/'}>
        <div className="nav-bar__logo" />
      </Link>
      <div className="nav-bar__menu--right">
        <div className="nav-search">
          <SearchDropDown />
        </div>
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
            <DropDown />
            <div className="profile-menu">
              <img
                alt="Profile image"
                className="profile-menu__avatar"
                src={avatar}
                onClick={toggleProfileMenu}
              />
              <div
                className={classnames('profile-menu__container', { active: profileMenuIsActive })}
              >
                <ul className="profile-menu__list">
                  <li className="profile-menu__item">
                    <Link className="profile-menu__link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="profile-menu__item">
                    <Link className="profile-menu__link" to="/article/bookmark">
                      Bookmarks
                    </Link>
                  </li>
                  <li className="profile-menu__item last">
                    <Link className="profile-menu__link" to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
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
  userIsAuthenticated: PropTypes.bool,
  isBookmarkActive: PropTypes.bool,
  profileMenuIsActive: PropTypes.bool,
  toggleProfileMenu: PropTypes.func
};

export default NavBarDefault;

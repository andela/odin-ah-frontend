import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBarDefault from './NavBarDefault';
import './NavBar.scss';
import { openLoginModal, openRegistrationModal } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { logout } from '../../redux/actions/auth/login';

const propTypes = {
  userIsAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
  userLoginRequest: PropTypes.func,
  openRegistrationModal: PropTypes.func,
  openLoginModal: PropTypes.func,
  isDashboardActive: PropTypes.bool,
};

const defaultProps = {
  userIsAuthenticated: false
};

export class NavBarContainer extends React.Component {
  render() {
    return <NavBarDefault
    isDashboardActive={this.props.isDashboardActive}
      handleLogin={this.props.openLoginModal}
      handleSignup={this.props.openRegistrationModal}
      handleLogout={this.props.handleLogout}
      userIsAuthenticated={this.props.userIsAuthenticated}
    />;
  }
}

NavBarContainer.propTypes = propTypes;
NavBarContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  articles: state.landingPageArticles.articlesInView,
  tags: state.landingPageTags.tags,
  userIsAuthenticated: state.login.isAuthenticated,
  loadingArticles: state.landingPageArticles.loadingArticles,
  currentPage: state.landingPageArticles.currentPage,
  isDashboardActive: state.profile.isDashboardActive
});
export default connect(mapStateToProps, {
  openRegistrationModal,
  openLoginModal,
  handleLogout: logout,
  registerUser,
})(NavBarContainer);

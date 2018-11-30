import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBarDefault from './NavBarDefault';
import './NavBar.scss';
import { openLoginModal, openRegistrationModal, toggleProfileMenu } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { logout } from '../../redux/actions/auth/login';

const propTypes = {
  userIsAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
  userLoginRequest: PropTypes.func,
  openRegistrationModal: PropTypes.func,
  openLoginModal: PropTypes.func,
  profileMenuIsActive: PropTypes.bool,
  toggleProfileMenu: PropTypes.func.isRequired,
};

const defaultProps = {
  userIsAuthenticated: false
};

export class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    document.body.addEventListener('click', this.handleClose, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClose, false);
  }

  handleClose() {
    if (this.props.profileMenuIsActive) {
      this.props.toggleProfileMenu();
    }
  }

  toggleProfileMenu() {
    this.props.toggleProfileMenu();
  }

  render() {
    return <NavBarDefault
      handleLogin={this.props.openLoginModal}
      handleSignup={this.props.openRegistrationModal}
      handleLogout={this.props.handleLogout}
      userIsAuthenticated={this.props.userIsAuthenticated}
      profileMenuIsActive={this.props.profileMenuIsActive}
      toggleProfileMenu={this.toggleProfileMenu}
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
  profileMenuIsActive: state.profile.profileMenuIsActive
});
export default connect(mapStateToProps, {
  openRegistrationModal,
  openLoginModal,
  handleLogout: logout,
  registerUser,
  toggleProfileMenu
})(NavBarContainer);

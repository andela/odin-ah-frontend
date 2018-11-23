import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openLoginModal, openModal, openRegistrationModal } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { logout, userLoginRequest } from '../../redux/actions/auth/login';

import LandingPageView from './LandingPageView';
import './LandingPage.scss';
import { fetchArticlePage, fetchArticles } from '../../redux/actions/landingPage/articles';
import { fetchPtags } from '../../redux/actions/landingPage/tags';
import PageLoader from '../PageLoader';


const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  userIsAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  userLoginRequest: PropTypes.func,
  articles: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchPtags: PropTypes.func.isRequired,
  fetchArticlePage: PropTypes.func.isRequired,
  loadingArticles: PropTypes.bool,
  handleLogout: PropTypes.func,
  currentPage: PropTypes.number,
  openRegistrationModal: PropTypes.func,
  openLoginModal: PropTypes.func
};

const defaultProps = {
  userIsAuthenticated: false
};

export class LandingPageContainer extends React.Component {
  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchPtags();
    const urlParams = new URLSearchParams(this.props.location.search);
    const login = urlParams.get('login');
    const register = urlParams.get('register');
    // setUserId(this.props.userId);
    // getUserId();
   

    if (login !== null) {
      this.props.openLoginModal();
    }
    if (register !== null) {
      this.props.openRegistrationModal();
    }
  }

  handleFetchArticlePage = (page) => {
    this.props.fetchArticlePage(page);
  };

  render() {
    const { userIsAuthenticated } = this.props;
    return (
      <React.Fragment>
        {this.props.loadingArticles && <PageLoader text="Loading..." />}
        {!this.props.loadingArticles && (
          <LandingPageView
            handleLogin={this.props.openLoginModal}
            handleSignup={this.props.openRegistrationModal}
            handleLogout={this.props.handleLogout}
            articles={this.props.articles}
            ptags={this.props.tags}
            handleFetchArticlePage={this.handleFetchArticlePage}
            loadingArticles={this.props.loadingArticles}
            userIsAuthenticated={userIsAuthenticated}
          />
        )}
      </React.Fragment>
    );
  }
}

LandingPageContainer.propTypes = propTypes;
LandingPageContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  articles: state.landingPageArticles.articlesInView,
  tags: state.landingPageTags.tags,
  userId: state.login.user,
  userIsAuthenticated: state.login.isAuthenticated,
  loadingArticles: state.landingPageArticles.loadingArticles,
  currentPage: state.landingPageArticles.currentPage
});

export default connect(
  mapStateToProps,
  {
    openRegistrationModal,
    openLoginModal,
    openModal,
    registerUser,
    userLoginRequest,
    handleLogout: logout,
    fetchArticles,
    fetchPtags,
    fetchArticlePage,
  }
)(LandingPageContainer);

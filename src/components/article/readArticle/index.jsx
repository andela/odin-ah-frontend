import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PageLoader from '../../PageLoader';
import { deleteArticle, getArticle } from '../../../redux/actions/articles/articles';
import ArticleContent from './articleContent';
import Comment from './comment';
import { getComments } from '../../../redux/actions/articles/comments';
import { dateToString } from '../../../utils';
import { redirect } from '../../../redux/actions/redirect';
import PageNotFound from '../../error/PageNotFound';
import LoginModal from '../../login/LoginModal';
import NavBarContainer from '../../header/NavBarContainer';
import { openModal } from '../../../redux/actions/modal';
import { registerUser } from '../../../redux/actions/auth/register';
import { logout, userLoginRequest } from '../../../redux/actions/auth/login';
import { ModalContent } from '../../signup/modalComponent';

const cleanArticle = (article) => {
  if (article) {
    const result = { ...article };
    result.parsedDate = dateToString(result.createdAt);
    result.readingTime = Math.ceil(result.readingTime / (60 * 1000));
    return result;
  }
  return null;
};

export class ReadArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false
    };
  }

  handleLoginModal = () => {
    this.setState(state => ({ showLoginModal: !state.showLoginModal }));
  };

  openRegistrationModalComponent = () => {
    const content = {};
    content.Component = ModalContent;
    content.props = { registerUser: this.props.registerUser };
    this.props.openModal(content);
  };

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getArticle(slug);
    this.props.getComments(slug);
  }

  onDropDownItemClicked = (item) => {
    const { slug } = this.props.match.params;
    switch (item) {
      case 'Delete':
        this.props.deleteArticle(slug);
        break;
      case 'Edit':
        this.props.redirect(`/article/edit/${slug}`);
        break;
      default:
        break;
    }
  };

  getMenuItems = () => {
    const { loggedInUser, isAuthenticated } = this.props;
    const { author } = this.props.article;
    const owner = loggedInUser && author.username === loggedInUser.username;

    let loggedInUserMenu = [];
    if (isAuthenticated && owner) {
      loggedInUserMenu = ['Edit', 'Delete'];
    } else if (isAuthenticated) {
      loggedInUserMenu = ['Report article'];
    }
    return loggedInUserMenu;
  };

  render() {
    const {
      article, comment, redirectTo, errorCode, isAuthenticated
    } = this.props;
    if (redirectTo) {
      return (<Redirect {...redirectTo} />);
    }

    let dropDownItems;
    if (article) dropDownItems = this.getMenuItems();
    return (
      <React.Fragment>
        <NavBarContainer
          handleLogin={this.handleLoginModal}
          handleSignup={this.openRegistrationModalComponent}
          handleLogout={this.props.handleLogout}
          userIsAuthenticated={this.props.isAuthenticated}
        />
        {(errorCode === 404) && (<PageNotFound
          title={'Article not found'}
          text='This article may have been deleted or updated by the author.'/>)}
        {(!article && errorCode !== 404) && <PageLoader text={'Loading article'}/>}
        {
          (article && errorCode !== 404)
          && <div className={'read-view'}>
            <ArticleContent
              onDropDownItemClicked={this.onDropDownItemClicked}
              dropDownItems={dropDownItems}
              article={article}/>
            <Comment comments={(comment) ? comment.comments : []}/>
          </div>
        }
        {
          (!isAuthenticated)
          && <LoginModal
            show={this.state.showLoginModal}
            close={this.handleLoginModal}
            userLoginRequest={this.props.userLoginRequest}
          />
        }
      </React.Fragment>
    );
  }
}

ReadArticle.propTypes = {
  isAuthenticated: PropTypes.bool,
  loggedInUser: PropTypes.object,
  errorCode: PropTypes.number,
  redirectTo: PropTypes.object,
  match: PropTypes.object,
  article: PropTypes.object,
  comment: PropTypes.object,
  getArticle: PropTypes.func,
  getComments: PropTypes.func,
  deleteArticle: PropTypes.func,
  redirect: PropTypes.func,
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  userLoginRequest: PropTypes.func,
  handleLogout: PropTypes.func
};

ReadArticle.defaultProps = {
  errorCode: -1,
};

const mapStateToProps = state => ({
  article: cleanArticle(state.articles.article),
  comment: state.articles.comment,
  loading: state.articles.loading,
  errorCode: state.articles.statusCode,
  responseMessage: state.articles.response,
  showDialog: state.articles.open,
  isAuthenticated: state.login.isAuthenticated,
  loggedInUser: state.login.user,
  redirectTo: state.redirect.redirectTo,
});

export default connect(mapStateToProps, {
  getArticle,
  getComments,
  deleteArticle,
  redirect,
  openModal,
  registerUser,
  userLoginRequest,
  handleLogout: logout,
})(ReadArticle);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
import {
  sendComment, getComments, resetRefresh
} from '../../redux/actions/comment/comment';
import { showToast } from '../../redux/actions/notification';
import { openLoginModal } from '../../redux/actions/modal';

export class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
      readyToType: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { slug } = this.props;
    this.props.getComments(slug);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { slug, refreshComments } = props;
    if (refreshComments) {
      this.props.getComments(slug);
      this.props.resetRefresh();
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onBlur() {
    if (!this.state.commentInput.trim().length) {
      this.setState({
        readyToType: false
      });
    }
  }

  onFocus() {
    const { isAuthenticated, openLoginModal: popUpLoginModal } = this.props;
    if (!isAuthenticated) {
      popUpLoginModal();
      return;
    }
    this.setState({
      readyToType: true
    });
  }

  async postCommentHandler() {
    const {
      sendComment: postComment,
      slug,
      showToast: showToastError,
      isAuthenticated,
      openLoginModal: popUpLoginModal
    } = this.props;
    const { commentInput } = this.state;
    if (!isAuthenticated) {
      popUpLoginModal();
      return;
    }
    if (!commentInput.trim().length) {
      const error = {
        type: 'error',
        text: 'Comment cannot be empty'
      };
      showToastError(error);
      return;
    }
    const payload = {
      slug,
      comment: {
        body: commentInput
      }
    };
    const statusCode = await postComment(payload);
    if (statusCode) {
      this.setState({
        commentInput: ''
      });
    }
  }

  render() {
    const {
      sendingComment, comments, user, isAuthenticated
    } = this.props;
    const defaultImage = 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-450w-387516193.jpg';
    const userImage = user && user.imageUrl ? user.imageUrl : defaultImage;
    return (
      <CommentBox
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        readyToType={this.state.readyToType}
        onChange={this.onChange}
        commentInputValue={this.state.commentInput}
        onCommentClick={this.postCommentHandler}
        sendingComment={sendingComment}
        comments={comments}
        userImage={userImage}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

CommentContainer.propTypes = {
  slug: PropTypes.string.isRequired,
  user: PropTypes.object,
  sendComment: PropTypes.func.isRequired,
  sendingComment: PropTypes.bool,
  comments: PropTypes.array.isRequired,
  errors: PropTypes.array,
  getComments: PropTypes.func.isRequired,
  resetRefresh: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sendingComment: state.comment.sendingComment,
  refreshComments: state.comment.refreshComments,
  comments: state.comment.comments,
  errors: state.comment.errors,
  isAuthenticated: state.login.isAuthenticated,
  user: state.login.user
});

const mapDispatchToProps = {
  sendComment,
  getComments,
  resetRefresh,
  showToast,
  openLoginModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import validate from 'validate.js';
import {
  createArticleRequest,
  openPublishModal,
  closePublishModal,
  showCreateError,
  hideCreateError,
  hideCreateResponse
} from '../../../redux/actions/articles/articles';
import { createArticleConstraint } from '../../../utils/validator/constraint/article';
import '../style.scss';
import Header from '../../Header/HeaderContainer';
import TitleInput from '../Editor/TitleInput';
import BodyInput from '../Editor/BodyInput';
import PublishContainer from '../Editor/PublishContainer';

const initialTitleValue = 'Title';
const initialBodyValue = '<p>Start typing ...</p>';
export class CreateArticle extends Component {
  state = {
    rawTextValue: {
      title: '',
      body: '',
    },
    title: initialTitleValue,
    body: initialBodyValue,
    description: '',
    tags: [],
    isPrivate: false,
    downloadable: true,
  };

  /**
   *
   * @description sets state of raw title
   */
  titleChangeHandler = (event) => {
    const title = event.target.getContent({ format: 'text' });
    const rawTextValue = {
      ...this.state.rawTextValue,
      title
    };
    this.setState({
      rawTextValue
    });
  }

  /**
   *
   * @description sets state of raw body
   */
  bodyChangeHandler = (event) => {
    const rawBody = event.target.getContent({ format: 'text' });
    const description = rawBody.trim().slice(0, 100);
    const rawTextValue = {
      ...this.state.rawTextValue,
      body: rawBody
    };
    this.setState({
      rawTextValue,
      description
    });
  }

  titleEditorChangeHandler = (title) => {
    this.setState({
      ...this.state,
      title
    });
  }

  bodyEditorChangeHandler = (body) => {
    this.setState({
      ...this.state,
      body
    });
  }

  checkStrEquality = (content, placeholderValue) => (
    content.trim() === placeholderValue
  )

  /**
   *
   * @description if title is the initial title value then empty title
   */
  titleFocusInHandler = () => {
    const { title } = this.state;
    if (Object.keys(this.props.errors).length) {
      this.props.hideError();
    }
    if (this.checkStrEquality(title, initialTitleValue)) {
      this.setState({
        ...this.state,
        title: ''
      });
    }
  }

  /**
   *
   * @description if body is the initial body value then empty body
   */
  bodyFocusInHandler = () => {
    const { body } = this.state;
    if (Object.keys(this.props.errors).length) {
      this.props.hideError();
    }
    if (this.checkStrEquality(body, initialBodyValue)) {
      this.setState({
        ...this.state,
        body: ''
      });
    }
  }

  /**
   *
   * @description if title is empty, sets the initial title value
   */
  titleFocusOutHandler = () => {
    const { title } = this.state;
    if (this.checkStrEquality(title, '')) {
      this.setState({
        ...this.state,
        title: initialTitleValue
      });
    }
  }

  /**
   *
   * @description if body is empty, sets the initial body value
   */
  bodyFocusOutHandler = () => {
    const { body } = this.state;
    if (this.checkStrEquality(body, '')) {
      this.setState({
        ...this.state,
        body: initialBodyValue
      });
    }
  }

  closePublishModal = () => {
    this.setState({
      open: false
    });
  }

  tagChangeHandler = (tags) => {
    this.setState({
      tags
    });
  }

  checkBoxHandler = (event) => {
    const targetBox = event.target.name;
    this.setState({
      [targetBox]: !this.state[targetBox]
    });
  }

  publishHandler = () => {
    const { rawTextValue } = this.state;
    const errors = validate(rawTextValue, createArticleConstraint);
    if (errors) {
      this.props.showError(errors);
    } else {
      this.props.openPublishModal();
    }
  }

  finish = async () => {
    const { publishArticle, hideResponse, history } = this.props;
    const {
      title, body, description, tags, isPrivate, downloadable
    } = this.state;
    const articleData = {
      title, body, description, tags, isPrivate, downloadable
    };
    // tags array contains tag objects = { label, value, __isNew__ }
    // get the value in each tag object
    const tagValues = tags.map(tag => tag.value);
    const article = { ...articleData, tags: tagValues, publish: true };
    const statusCode = await publishArticle(article);
    if (statusCode === 201) {
      setTimeout(() => {
        hideResponse();
        history.push('/');
      }, 500);
    }
  }

  getSingleErrorMessage = (errors) => {
    let errorMessage;
    const { message, title, body } = errors;
    if (Object.keys(errors).length && (message || title || body)) {
      errorMessage = message || title || body;
    }
    return errorMessage;
  };

  render() {
    const {
      title, body, description, tags, isPrivate, downloadable
    } = this.state;
    const {
      responseMessage, errors, showDialog, closePublishModal: closeModal
    } = this.props;
    const emptyTitle = this.checkStrEquality(title, initialTitleValue);
    const emptyBody = this.checkStrEquality(body, initialBodyValue);
    const errorMessage = this.getSingleErrorMessage(errors);
    const articleData = {
      title, body, description, tags, isPrivate, downloadable
    };
    return (
      <div>
        <Header isAuthenticated={false} />
        <section className={classnames('section', { 'show-butter': errorMessage || responseMessage })}>
          <div className='butter__container'>
            <div className={classnames('butter__container--type', { success: responseMessage }, { error: errorMessage }) }>
              <div className='butter__container--message'>{ errorMessage || responseMessage }</div>
            </div>
          </div>
          < PublishContainer
            close={closeModal}
            show={showDialog}
            articleData={articleData}
            tagChangeHandler={this.tagChangeHandler}
            checkBoxHandler={this.checkBoxHandler}
            finish={this.finish}
          />
          <div className='container publish'>
            <button className='publish__button btn btn--white btn--animated' onClick={this.publishHandler}>Publish</button>
          </div>
          <div className='container form'>
            <div className='columns'>
              <div className='column'>
                <div className='article-form'>
                  <div className='input-group'>
                    <div className={classnames('title-input', { empty: emptyTitle })}>
                      <TitleInput
                        value={title}
                        onEditorChange={this.titleEditorChangeHandler}
                        onChange={this.titleChangeHandler}
                        onFocusIn={this.titleFocusInHandler}
                        onFocusOut={this.titleFocusOutHandler}
                        />
                    </div>
                  </div>
                  <div className='input-group'>
                    <div className={classnames('body-input', { empty: emptyBody })}>
                      <BodyInput
                        value={body}
                        onEditorChange={this.bodyEditorChangeHandler}
                        onChange={this.bodyChangeHandler}
                        onFocusIn={this.bodyFocusInHandler}
                        onFocusOut={this.bodyFocusOutHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  publishArticle: PropTypes.func.isRequired,
  openPublishModal: PropTypes.func.isRequired,
  closePublishModal: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  showError: PropTypes.func.isRequired,
  hideError: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  responseMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  articles: state.articles,
  loading: state.articles.loading,
  errors: state.articles.errors,
  responseMessage: state.articles.response,
  showDialog: state.articles.open
});

const mapDispatchToProps = {
  publishArticle: createArticleRequest,
  openPublishModal,
  closePublishModal,
  showError: showCreateError,
  hideError: hideCreateError,
  hideResponse: hideCreateResponse
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

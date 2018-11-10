import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import validate from 'validate.js';
import {
  getArticleForUpdate,
  updateArticleRequest,
  openPublishModal,
  closePublishModal,
  showCreateError,
  hideCreateError,
  hideCreateResponse
} from '../../../redux/actions/articles/articles';
import { createArticleConstraint } from '../../../validators/constraints/article';
import uploadArticleImage from '../../../services/cloudinary';
import '../style.scss';
import TitleInput from '../Editor/TitleInput';
import BodyInput from '../Editor/BodyInput';
import PublishContainer from '../Editor/PublishContainer';
import PageNotFound from '../../404/PageNotFound';

const initialTitleValue = 'Title';
const initialBodyValue = '<p>Start typing ...</p>';
export class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawTextValue: {
        title: '',
        body: '',
      },
      title: initialTitleValue,
      body: initialBodyValue,
      description: '',
      imageUrl: '',
      tags: [],
      isPrivate: false,
      downloadable: true,
    };
    this.publishHandler = this.publishHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
    this.titleEditorChangeHandler = this.titleEditorChangeHandler.bind(this);
    this.bodyEditorChangeHandler = this.bodyEditorChangeHandler.bind(this);
    this.titleFocusInHandler = this.titleFocusInHandler.bind(this);
    this.bodyFocusInHandler = this.bodyFocusInHandler.bind(this);
    this.titleFocusOutHandler = this.titleFocusOutHandler.bind(this);
    this.bodyFocusOutHandler = this.bodyFocusOutHandler.bind(this);
    this.tagChangeHandler = this.tagChangeHandler.bind(this);
    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.finish = this.finish.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.titlePasteHandler = this.titlePasteHandler.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { match, getArticle } = this.props;
    const { slug } = match.params;
    getArticle(slug);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { articleToEdit } = nextProps;
    if (articleToEdit && this.props.articleToEdit !== articleToEdit) {
      const {
        title, body, description, imageUrl, isPrivate, tags
      } = articleToEdit;
      // format string of tags to an object readable by CreateableSelect from react-select
      const formattedTags = tags.map(tag => ({
        label: tag,
        value: tag,
        __isNew__: false
      }));
      const article = {
        rawTextValue: {
          title,
        },
        title,
        body,
        description,
        imageUrl,
        tags: formattedTags,
        isPrivate
      };
      this.setState({ ...article });
    }
  }

  /**
   *
   * @description sets state of raw title
   */
  titleChangeHandler(event) {
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
  bodyChangeHandler(event) {
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

  titleEditorChangeHandler(title) {
    this.setState({
      ...this.state,
      title
    });
  }

  bodyEditorChangeHandler(body) {
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
  titleFocusInHandler() {
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
  bodyFocusInHandler() {
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
  titleFocusOutHandler() {
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
  bodyFocusOutHandler() {
    const { body } = this.state;
    if (this.checkStrEquality(body, '')) {
      this.setState({
        ...this.state,
        body: initialBodyValue
      });
    }
  }

  titlePasteHandler(event) {
    event.preventDefault();
    // The method for reading text from clipboard was adopted from https://stackoverflow.com/a/27323689
    let content = ((event.originalEvent || event).clipboardData || window.clipboardData).getData('Text');
    content = this.state.title + content;
    this.setState({
      title: content
    });
  }

  tagChangeHandler(tags) {
    this.setState({
      tags
    });
  }

  checkBoxHandler(event) {
    const targetBox = event.target.name;
    this.setState({
      [targetBox]: !this.state[targetBox]
    });
  }

  async imageUploadHandler(blobInfo, success, failure) {
    try {
      const uploadUrl = await uploadArticleImage(blobInfo, success, failure);
      const { imageUrl } = this.state;
      success(uploadUrl);
      if (!imageUrl) {
        this.setState({
          imageUrl: uploadUrl
        });
      }
    } catch (error) {
      failure('Image upload failed.');
    }
  }

  publishHandler() {
    const { rawTextValue } = this.state;
    const errors = validate(rawTextValue, createArticleConstraint);
    if (errors) {
      this.props.showError(errors);
    } else {
      this.props.openPublishModal();
    }
  }

  async finish() {
    const {
      publishArticle, hideResponse, history, match
    } = this.props;
    const { slug } = match.params;
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
    const statusCode = await publishArticle(slug, article);
    if (statusCode === 200) {
      setTimeout(() => {
        hideResponse();
        history.push('/');
      }, 500);
    } else if (statusCode === 404) {
      history.push('/404');
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
      responseMessage, errors, showDialog, closePublishModal: closeModal, statusCode
    } = this.props;
    const emptyTitle = this.checkStrEquality(title, initialTitleValue);
    const emptyBody = this.checkStrEquality(body, initialBodyValue);
    const errorMessage = this.getSingleErrorMessage(errors);
    const articleData = {
      title, body, description, tags, isPrivate, downloadable
    };
    let displayContent;
    if (statusCode === 404) {
      displayContent = <PageNotFound />;
    } else {
      displayContent = (
        <div>
          <section className={classnames('section', 'update-section', { 'show-butter': errorMessage || responseMessage })}>
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
              <button className='publish__button' onClick={this.publishHandler} disabled={!this.state.rawTextValue.body}>Update and Publish</button>
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
                          onPaste={this.titlePasteHandler}
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
                          imageUploadHandler={this.imageUploadHandler}
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
    return displayContent;
  }
}

UpdateArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  articleToEdit: PropTypes.object,
  publishArticle: PropTypes.func.isRequired,
  openPublishModal: PropTypes.func.isRequired,
  closePublishModal: PropTypes.func.isRequired,
  showDialog: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  showError: PropTypes.func.isRequired,
  hideError: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  responseMessage: PropTypes.string,
  statusCode: PropTypes.number,
};

const mapStateToProps = state => ({
  articleToEdit: state.articles.articleToEdit,
  loading: state.articles.loading,
  errors: state.articles.errors,
  responseMessage: state.articles.response,
  showDialog: state.articles.open,
  statusCode: state.articles.statusCode
});

const mapDispatchToProps = {
  getArticle: getArticleForUpdate,
  publishArticle: updateArticleRequest,
  openPublishModal,
  closePublishModal,
  showError: showCreateError,
  hideError: hideCreateError,
  hideResponse: hideCreateResponse
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArticle);

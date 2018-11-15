import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PublishModal from './PublishModal';

export default class PublishContainer extends Component {
  render() {
    const {
      show, close, articleData, tagChangeHandler, checkBoxHandler, finish
    } = this.props;
    const { tags, isPrivate, downloadable } = articleData;
    return (
      < PublishModal
        close={close}
        finish={finish}
        show={show}
        tags={tags}
        isPrivate={isPrivate}
        downloadable={downloadable}
        tagChangeHandler={tagChangeHandler}
        checkBoxHandler={checkBoxHandler}
      />
    );
  }
}

PublishContainer.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  articleData: PropTypes.object.isRequired,
  tagChangeHandler: PropTypes.func.isRequired,
  checkBoxHandler: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired
};

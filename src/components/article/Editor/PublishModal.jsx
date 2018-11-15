import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TagInput from './TagInput';


const PublishModal = ({
  tags,
  show,
  close,
  finish,
  isPrivate,
  downloadable,
  tagChangeHandler,
  checkBoxHandler
}) => (
  <div className={classnames('modal m-publish', { 'is-active': show })}>
    <div className="modal-background"></div>
    <div className="modal-content">
        <div className="modal-publish">
          <div className="modal-publish__title">
            Publish Settings
          </div>
          <div className="modal-publish__content">
            <div className="select-tag">
              <TagInput tagChangeHandler={tagChangeHandler} tags={tags}/>
            </div>
            <div className="checkbox">
              <input onChange={checkBoxHandler} type="checkbox" name="isPrivate" className="checkbox__private" id="private" checked={isPrivate}/>
              <label htmlFor="private">
                <div className="checkbox__icon">
                  <i className="fa fa-check"></i>
                </div>
                <div className="setting">
                  <div className="setting__title">Make this article private?</div>
                  <div className="setting__description">Only people with link to this article will be able to view it.</div>
                </div>
              </label>
            </div>
            <div className="checkbox">
              <input onChange={checkBoxHandler} type="checkbox" name="downloadable" className="checkbox__download" id="download" checked={downloadable}/>
              <label htmlFor="download">
                <div className="checkbox__icon">
                  <i className="fa fa-check"></i>
                </div>
                <div className="setting">
                  <div className="setting__title">Enable download on this article?</div>
                  <div className="setting__description">This option lets reader download a copy of this article.</div>
                </div>
              </label>
            </div>
            <div className="action">
              <button className="action__finish" onClick={finish}>Finish</button>
              <button className="action__cancel" onClick={close}>Cancel</button>
            </div>
          </div>
        </div>
    </div>
  </div>
);

PublishModal.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  downloadable: PropTypes.bool,
  tagChangeHandler: PropTypes.func.isRequired,
  checkBoxHandler: PropTypes.func.isRequired
};

export default PublishModal;

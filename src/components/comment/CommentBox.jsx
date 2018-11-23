import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';
import TextareaAutosize from 'react-autosize-textarea';
import SingleComment from './SingleComment';

const CommentBox = ({
  commentInputValue,
  onCommentClick,
  onChange,
  sendingComment,
  comments,
  userImage,
  onFocus,
  onBlur,
  readyToType,
  isAuthenticated
}) => (
  <section className="section show-butter">
    <div className="container">
      <div className="columns">
        <div className="column">
         <div className="comment-area">
         {/* just for the comment box */}
          <div className="comment-container">
            <div className="comment-box">
              <img className="comment-box__avatar" alt="avatar" src={userImage} />
              <TextareaAutosize onFocus={onFocus} onBlur={onBlur} onChange={onChange} name="commentInput" value={commentInputValue} className="comment-box__input" style={{ resize: 'none', width: '100%', border: 'none' }} placeholder="Add a comment..."/>
            </div>
            {isAuthenticated && readyToType ? <div className="comment-action">
              <button type="submit" className={classnames({ button: sendingComment, 'is-loading': sendingComment })} onClick={onCommentClick}>Comment</button>
            </div> : null}
          </div>
          <div className="comment-count">
            {comments.length ? comments.length : undefined } Comments
          </div>
          <div className="comment-list">
            { comments.length ? <ul className="comment-list__single">
              { comments.slice().reverse().map((comment, index) => {
                const { body, author } = comment;
                const { username, imageUrl } = author;
                return (
                  <SingleComment
                    key={index}
                    body={body}
                    username={username}
                    imageUrl={imageUrl}
                  />
                );
              })}
            </ul> : null }
          </div>
         </div>
        </div>
      </div>
    </div>
  </section>
);

CommentBox.propTypes = {
  userImage: PropTypes.string.isRequired,
  commentInputValue: PropTypes.string.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  sendingComment: PropTypes.bool,
  comments: PropTypes.array.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  readyToType: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default CommentBox;

import React from 'react';
import PropTypes from 'prop-types';

const SingleComment = ({
  body,
  imageUrl,
  username,
}) => (
  <li>
    <div className="comment-list__level comment-list__level-main">
      <div className="comment-list__head">
        <img className="comment-list__avatar" src={imageUrl || 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-450w-387516193.jpg' } alt="avatar"/>
      </div>
      <div className="comment-list__body">
        <div className="comment-list__username">
          {username}
        </div>
        <div className="comment-list__content">
          {body}
        </div>
      </div>
    </div>
  </li>
);


SingleComment.propTypes = {
  body: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
};


export default SingleComment;

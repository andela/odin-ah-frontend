import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import FollowButtonContainer from '../../users/FollowButtonContainer';

const defaultImage = 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-450w-387516193.jpg';
export default function ProfileView({ user, date, readTime }) {
  const { imageUrl, name, id } = user;
  const token = localStorage.getItem('jwtToken');
  let currentUser = null;
  if (token) currentUser = jwtDecode(token).userId;
  const currentUserIsAuthor = currentUser === id;
  return (
    <div className={'profile'}>
      <div>
        <img alt={"Author's profile"} className={'profile__image'} src={imageUrl || defaultImage} />
      </div>
      <div className={'profile__details'}>
        <div className="profile-detail">
          <span className="profile-detail__name">{name}</span>
          <FollowButtonContainer userId={id}>
            {({ onClickHandler, text, loading }) => (
              <span
                onClick={onClickHandler}
                className="profile-detail__follow"
                style={{ display: currentUserIsAuthor && 'none' }}
              >
                {!loading ? text : <i className="fas fa-spinner fa-pulse" />}
              </span>
            )}
          </FollowButtonContainer>
        </div>
        <div className="article-detail">
          <span className="article-detail__date">{date}</span>
          <span className="article-detail__read-time">{`${readTime} min read`}</span>
        </div>
      </div>
    </div>
  );
}

ProfileView.propTypes = {
  date: PropTypes.string,
  readTime: PropTypes.number,
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string
  })
};

ProfileView.defaultProps = {};

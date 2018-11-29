import React from 'react';
import PropTypes from 'prop-types';
import FollowButtonContainer from './FollowButtonContainer';
import userAvatar from '../../user-avatar.svg';
import './FollowProfileCard.scss';

class FollowProfileCard extends React.PureComponent {
  render() {
    const {
      user: {
        imageUrl, username, bio, userId
      }
    } = this.props;
    return (
      <div className="user__profile-card">
        <img alt="avatar" className="user__profile-image" src={imageUrl || userAvatar} />
        <div className="user__details">
          <div className="user__profile-name">{username}</div>
          <div className="user__profile-bio">{bio}</div>
          <FollowButtonContainer userId={userId}>
            {({ onClickHandler, text, loading }) => (
              <div onClick={onClickHandler} className="user__follow-button">
                {!loading ? text : <i className="fas fa-spinner fa-pulse" />}
              </div>
            )}
          </FollowButtonContainer>
        </div>
      </div>
    );
  }
}

FollowProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  updateCallback: PropTypes.func
};

export default FollowProfileCard;

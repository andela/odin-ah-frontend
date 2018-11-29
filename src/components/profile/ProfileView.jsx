import React from 'react';
import PropTypes from 'prop-types';
import { ProfileImageUpload } from '../profileImageUpload/ProfileImageUpload';
import { Toggle } from '../toggle/index';
import Alert from '../notification/alert';
import './ProfileView.scss';


const ProfileView = ({
  profiledata, modified, settings, isLoading,
  fileSelectedHandler, handleInputOnChange,
  handleProfileUpdate, handleToggleCheckBox
}) => {
  if (profiledata) {
    const {
      firstName, lastName, username, email, imageUrl, bio
    } = profiledata;
    const {
      articleComment, articleLike, emailSubscribe, newArticleFromUserFollowing, newFollower, newFollowerOnSeries
    } = settings.settings;
    return (
  <div className='profile-container'>
      <span className='profile-title'>Profile Details</span>
     
      <div className='profile-content-wrapper'>
      <Alert/>
      <hr/>
      <div className='profile-details-wrapper'>
     <div className='input-holder'>
     <input type='text' name='firstName' onChange={ handleInputOnChange } value={ firstName } placeholder='Enter your first name'/>{' '}
     <input type='text' name='lastName' onChange={ handleInputOnChange } value={ lastName } placeholder='Enter your last name'/>{' '}
     <input type='text' name='username' onChange={ handleInputOnChange } value={ username} placeholder='Enter your username'/>{' '}
     <input type='email' name='email' onChange={ handleInputOnChange } value={ email } placeholder='Enter your email'/>{' '}
     <textarea className="short-bio" name="bio" onChange={ handleInputOnChange } value={ bio } placeholder='Enter your bio'></textarea>
     </div>
     <div className='image-wrapper'>
     <ProfileImageUpload handleEvent={ fileSelectedHandler } imageUrl={ imageUrl }/>
     </div>
      </div>
      <span className='profile-title'>Notification Settings</span>
      <hr/>
      <div className='settings-wrapper'>
      <div className='settings-option' > Receive Notification when your article is liked <span><Toggle toggleName='articleLike' toggleCheckBox={ handleToggleCheckBox } isActive={ articleLike }/></span> </div>
      <div className='settings-option'> Receive article comment Notification  <span><Toggle toggleName='articleComment' toggleCheckBox={ handleToggleCheckBox } isActive={ articleComment }/></span> </div>
      <div className='settings-option'> Receive Notification when users you follow  publish an article <span><Toggle toggleName='newArticleFromUserFollowing' toggleCheckBox={ handleToggleCheckBox } isActive={ newArticleFromUserFollowing}/></span> </div>
      <div className='settings-option'> Receive Notification on series you are following <span><Toggle toggleName='newFollowerOnSeries' toggleCheckBox={ handleToggleCheckBox } isActive={ newFollowerOnSeries }/></span> </div>
      <div className='settings-option'> Receive Notification when other user follows you<span><Toggle toggleName='newFollower' toggleCheckBox={ handleToggleCheckBox } isActive={ newFollower }/></span> </div>
      <div className='settings-option'> Email Subscription<span><Toggle toggleName='emailSubscribe' toggleCheckBox={ handleToggleCheckBox } isActive={ emailSubscribe }/></span> </div>
      </div >
      <div className='but-section'>
           <button disabled={ modified } className={`button is-medium but-save ${isLoading ? 'is-loading' : '' }`} onClick={ handleProfileUpdate }>
            <span className="icon is-small">
             <i className="fas fa-check" />
             </span>
             <span>Save Changes</span>
           </button>
           </div>
      </div>
  </div>
    );
  }

  return <div>{null}</div>;
};

ProfileView.propTypes = {
  profiledata: PropTypes.object,
  modified: PropTypes.bool,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  fileSelectedHandler: PropTypes.func,
  handleInputOnChange: PropTypes.func,
  handleProfileUpdate: PropTypes.func,
  handleToggleCheckBox: PropTypes.func
};

export default ProfileView;

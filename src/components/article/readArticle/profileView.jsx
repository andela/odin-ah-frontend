import React from 'react';
import PropTypes from 'prop-types';

const defaultImage = 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-450w-387516193.jpg';
export default function ProfileView({ user, date, readTime }) {
  const { imageUrl, name } = user;
  return (
    <div className={'profile'}>
      <div>
        <img alt={'Author\'s profile'} className={'profile__image'} src={(imageUrl) || defaultImage}/>
      </div>
     <div className={'profile__details'}>
       <div className='profile-detail'>
         <span className='profile-detail__name'>
           {name}
         </span>
         <span className='profile-detail__follow'>
           follow
         </span>
       </div>
       <div className='article-detail'>
         <span className='article-detail__date'>
           {date}
         </span>
         <span className='article-detail__read-time'>
           {`${readTime} min read`}
         </span>
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
    imageUrl: PropTypes.string,
  })
};

ProfileView.defaultProps = {};

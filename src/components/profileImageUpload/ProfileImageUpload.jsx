import React from 'react';
import PropTypes from 'prop-types';
import './ProfileImageUpload.scss';


export const ProfileImageUpload = ({ handleEvent, imageUrl }) => (
   <div className="image-wrapper" style={{ backgroundImage: `url(${imageUrl})` }}>
       <input type="file" accept="image/*" name="file" id="file" className="inputfile" onChange={ handleEvent }/>
       <label htmlFor="file" className="icon is-large cam-icon">
         <i className="fas fa-3x fa-camera " />
     </label>
   </div>
);

ProfileImageUpload.propTypes = {
  handleEvent: PropTypes.func,
  imageUrl: PropTypes.string,
};

export default ProfileImageUpload;
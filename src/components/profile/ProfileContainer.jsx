import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadProfileData, uploadImageToCloud } from '../../redux/actions/profile';
import ProfileView from './ProfileView';

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

export class ProfileContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modified: !this.modified,
      profiledata: this.props.profiledata.data,
      isLoading: this.props.loading,
    };
  }

componentDidMount = () => {
  this.setState({
    profiledata: this.state.profiledata
  });
}

UNSAFE_componentWillReceiveProps = (nextProps) => {
  this.setState({
    profiledata: nextProps.profiledata.data
  });
}

  handleInputOnChange = (e) => {
    this.setState({
      profiledata: { ...this.state.profiledata, [e.target.name]: e.target.value },
      modified: !!this.modified
    });
  }

  handleToggleCheckBox = (e) => {
    const { profiledata } = this.state;
    const { settings } = profiledata;
    settings[e.target.name] = e.target.checked;
    this.setState({
      profiledata: { ...profiledata, settings },
      modified: !!this.modified
    });
  }

  handleProfileUpdate= (e) => {
    this.props.uploadProfileData(this.state.profiledata);
    this.setState({
      isLoading: this.props.loading
    });
  }

  fileSelectedHandler = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', uploadPreset);
    formData.append('api_key', apiKey);

    const imageUrl = await uploadImageToCloud(formData);
    const { profiledata } = this.state;
    profiledata.imageUrl = imageUrl;

    this.setState({
      profiledata: { ...profiledata },
      modified: !!this.modified
    });
  }

  render() {
    this.settings = {
      settings: this.props.profiledata.data
    };

    this.eventHandler = {
      handleInputOnChange: this.handleInputOnChange,
      handleToggleCheckBox: this.handleToggleCheckBox,
      handleProfileUpdate: this.handleProfileUpdate,
      fileSelectedHandler: this.fileSelectedHandler,
    };
    return (
    <div>
   <ProfileView { ...this.state } { ...this.eventHandler } { ...this.settings} isLoading={ this.props.profiledata.loading }/>
    </div>
    );
  }
}

ProfileContainer.propTypes = {
  profiledata: PropTypes.object.isRequired,
  uploadProfileData: PropTypes.func,
  isLoading: PropTypes.bool,
};


const mapDispatchToProps = {
  uploadProfileData,
};

export default connect(null, mapDispatchToProps)(ProfileContainer);

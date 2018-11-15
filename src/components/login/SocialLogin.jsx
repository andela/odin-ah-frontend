import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuthUserProfile } from '../../redux/actions/auth/login';
import apiRequest from '../../services/apiRequest';
import PageLoader from '../PageLoader';

export class SocialLogin extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const accessToken = urlParams.get('token');
    apiRequest.setToken(accessToken);
    localStorage.setItem('jwtToken', accessToken);
    this.props.getAuthUserProfile();
  }

  render() {
    if (!this.props.user) return (<PageLoader text={'Authenticating user'}/>);
    return (<Redirect to={'/'}/>);
  }
}

SocialLogin.propTypes = {
  user: PropTypes.object,
  match: PropTypes.any,
  login: PropTypes.object,
  location: PropTypes.any,
  getAuthUserProfile: PropTypes.func,
};

SocialLogin.defaultProps = {};

const mapStateToProps = state => ({
  user: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  login: state
});

export default connect(mapStateToProps, { getAuthUserProfile })(SocialLogin);

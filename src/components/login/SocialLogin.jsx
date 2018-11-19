import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuthUserProfile } from '../../redux/actions/auth/login';
import apiRequest from '../../services/apiRequest';
import PageLoader from '../PageLoader';
import PageNotFound from '../error/PageNotFound';

export class SocialLogin extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const accessToken = urlParams.get('access_token');
    apiRequest.setToken(accessToken);
    localStorage.setItem('jwtToken', accessToken);
    this.props.getAuthUserProfile();
  }

  render() {
    if (this.props.error.message) {
      return (<PageNotFound
        title='Ops! Something went wrong.'
        text={'Unable to authenticate this account at the moment.'}/>);
    }

    if (!this.props.user) return (<PageLoader text={'Authenticating user'}/>);
    return (<Redirect to={'/'}/>);
  }
}

SocialLogin.propTypes = {
  user: PropTypes.object,
  error: PropTypes.object,
  match: PropTypes.any,
  login: PropTypes.object,
  location: PropTypes.any,
  getAuthUserProfile: PropTypes.func,
};

SocialLogin.defaultProps = {};

const mapStateToProps = state => ({
  user: state.login.user,
  isAuthenticated: state.login.isAuthenticated,
  error: state.login.error,
});

export default connect(mapStateToProps, { getAuthUserProfile })(SocialLogin);

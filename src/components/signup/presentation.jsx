import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userValidator from '../../validators/UserValidator';
import Alert from '../notification/alert';

import './signup.scss';

import SocialButton from './social';
import Input from './Input';

export class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: null
    };
  }

  validateInput = (e) => {
    const { target } = e;
    const data = Input.getInputData(e);
    if (target.name === 'confirmPassword') {
      data.password = this.state.password;
    }
    if (target.value.length) {
      let { errors } = this.state;
      const result = userValidator.validateField(data);
      errors = { ...errors, ...result };
      this.setState({ errors });
    }
  };

  updateState = (data) => {
    const { errors } = this.state;
    if (errors) {
      Object.keys(data)
        .forEach((name) => {
          errors[name] = null;
        });
    }
    this.setState({
      ...data,
      errors
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      email, username, password, confirmPassword
    } = this.state;
    const errors = userValidator.validateSignUp({
      email,
      username,
      password,
      confirmPassword
    });
    if (!errors) {
      this.props.onSubmit({
        email,
        username,
        password
      });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const {
      email, username, password, confirmPassword, errors
    } = this.state;
    let emailError;
    let usernameError;
    let passwordError;
    let confirmPasswordError;
    if (errors) {
      emailError = errors.email;
      usernameError = errors.username;
      passwordError = errors.password;
      confirmPasswordError = errors.confirmPassword;
    }

    return (
      <div>
        <div>
          <Link to={'/'}>
            <img className={'signup-logo-image'} alt={'Logo'} src="/assets/images/logo.png"/>
          </Link>
        </div>
        <Alert/>
        <form onSubmit={this.onSubmit} id="signupForm" name="signupForm">
          <div>
            <Input
              type={'text'} iconType={'user'} field={'username'} value={username}
              fieldError={(usernameError) ? usernameError[0] : null}
              validateField={this.validateInput} onUpdate={this.updateState}/>
            <Input
              type={'email'} iconType={'envelope'} field={'email'}
              value={email} fieldError={(emailError) ? emailError[0] : null}
              validateField={this.validateInput} onUpdate={this.updateState}/>
            <Input
              type={'password'} iconType={'lock'} field={'password'} value={password}
              fieldError={(passwordError) ? passwordError[0] : null}
              validateField={this.validateInput} onUpdate={this.updateState}/>
            <Input
              type={'password'} iconType={'lock'} placeholder={'Confirm Password'}
              field={'confirmPassword'} value={confirmPassword}
              fieldError={(confirmPasswordError) ? confirmPasswordError[0] : null}
              validateField={this.validateInput} onUpdate={this.updateState}/>
            <div className="field">
              <div className="control">
                <button
                  type={'submit'}
                  className={`button is-primary is-medium is-fullwidth signup-btn ${(this.props.loading) ? 'is-loading' : ''}`}>
                  Sign Up
                </button>
              </div>
            </div>
            <br/>
            <hr/>
            <p>or sign up with one of these services</p>
            <SocialButton type={'signup'} social={'twitter'}/>
            <SocialButton type={'signup'} social={'facebook'}/>
            <SocialButton type={'signup'} social={'google'}/>
          </div>
        </form>
      </div>
    );
  }
}

Presentation.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Presentation.defaultProps = {
  loading: false
};

const mapStateToProps = state => ({
  loading: state.registration.loading,
});


export default connect(mapStateToProps, null)(Presentation);

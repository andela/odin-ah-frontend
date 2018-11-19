import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userValidator from '../../validators/UserValidator';

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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.result) {
      this.setState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        errors: null
      });
    }
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
            <div className="hr-text"><strong>or</strong></div>
            <p className='auth-option'>sign up with one of these services</p>
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
  result: PropTypes.object,
};

Presentation.defaultProps = {
  loading: false
};

const mapStateToProps = state => ({
  loading: state.registration.loading,
  result: state.registration.result,
});


export default connect(mapStateToProps, null)(Presentation);

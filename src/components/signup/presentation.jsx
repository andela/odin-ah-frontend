import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userValidator from '../../validators/UserValidator';
import { InputStatusIcon, InputStatusLabel } from './ErrorLabel';
import Alert from '../notification/alert';

import './signup.scss';

import SocialButton from './social';
import { alerts } from '../../redux/actions/notification';

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
    const data = {};
    data[target.name] = target.value;
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

  updateState = (e) => {
    const data = {};
    const { target } = e;
    data[target.name] = target.value;
    const { errors } = this.state;
    if (errors) {
      errors[target.name] = null;
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
      this.props.showAlert({
        type: 'error',
        text: 'Validation Error. Please provide a valid input',
      });
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
            <img className={'signup-logo-image'} alt={'Logo'} src="/assets/images/logo.jpg"/>
          </Link>
        </div>
        <Alert/>
        <form onSubmit={this.onSubmit} id="signupForm" name="signupForm">
          <div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${(usernameError) ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.updateState}
                  onBlur={this.validateInput}
                  id="username"
                  name="username"
                />
                <span className="icon is-small is-left">
                          <i className="fa fa-user"/>
                      </span>

                {usernameError && <InputStatusIcon type={'error'}/>}
              </div>
              {
                usernameError
                && <InputStatusLabel errors={usernameError}/>
              }
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${(emailError) ? 'is-danger' : ''}`}
                  value={email}
                  onChange={this.updateState}
                  onBlur={this.validateInput}
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                />
                <span className="icon is-small is-left">
                        <i className="fa fa-envelope"/>
                      </span>
                {emailError && <InputStatusIcon type={'error'}/>}
              </div>
              {
                emailError
                && <InputStatusLabel errors={emailError}/>
              }
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${(passwordError) ? 'is-danger' : ''}`}
                  value={password}
                  onChange={this.updateState}
                  onBlur={this.validateInput}
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-key"/>
                </span>
                {passwordError && <InputStatusIcon type={'error'}/>}
              </div>
              {
                passwordError
                && <InputStatusLabel errors={passwordError}/>
              }
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input is-medium ${(confirmPasswordError) ? 'is-danger' : ''}`}
                  value={confirmPassword}
                  onChange={this.updateState}
                  onBlur={this.validateInput}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
                <span className="icon is-small is-left">
                        <i className="fa fa-key"/>
                      </span>
                {confirmPasswordError && <InputStatusIcon type={'error'}/>}
              </div>
              {
                confirmPasswordError
                && <InputStatusLabel errors={confirmPasswordError}/>
              }
            </div>
            <div className="field">
              <div className="control">
                <button
                  type={'submit'}
                  className={`button is-success is-medium is-fullwidth signup-btn ${(this.props.loading) ? 'is-loading' : ''}`}>
                  Sign Up
                </button>
              </div>
            </div>
            <br/>
            <br/>
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
  showAlert: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Presentation.defaultProps = {
  loading: false
};

const mapStateToProps = state => ({
  loading: state.registration.loading,
});


const mapDispatchToProps = dispatch => ({
  showAlert: data => dispatch(alerts(true, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);

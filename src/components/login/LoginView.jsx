import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../signup/Input';
import SocialButton from '../signup/social';
import validateInput from './validations';

export class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { errors } = validateInput(this.state);
    const { email, password } = this.state;
    if (errors.email || errors.password) {
      this.setState(() => ({
        errors
      }));
    } else {
      this.props.onSubmit({
        email,
        password
      });
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

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form id="loginForm" onSubmit={this.onSubmit} noValidate>
          <Input type='email' iconType='envelope' placeholder='Email' value={this.state.email}
                 field='email' fieldError={errors.email} onUpdate={this.updateState}/>
          <Input type='password' iconType='lock' placeholder='Password' value={this.state.password}
                 field='password' fieldError={errors.password} onUpdate={this.updateState}/>
          <div className="field">
            <div className="control">
              <button type="submit" id="loginBtn"
                      className={`button is-primary is-medium is-fullwidth signup-btn ${(this.props.loading) ? 'is-loading' : ''}`}>
                Login
              </button>
            </div>
          </div>
        </form>
        <br/>
        <div className="field">
          <div className="level">
            <span className="checkbox level-right">
              <Link to="/reset-password">Forgot Password?</Link>
            </span>
          </div>
        </div>
        <div className="hr-text"><strong>or</strong></div>
        <p className='auth-option'>sign up with one of these services</p>
        <SocialButton type={'signin'} social={'twitter'}/>
        <SocialButton type={'signin'} social={'facebook'}/>
        <SocialButton type={'signin'} social={'google'}/>
      </div>
    );
  }
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginView.defaultProps = {
  loading: false
};


export default (LoginView);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from './Input';
import userValidator from '../../validators/UserValidator';

import './verification.scss';

class ReVerificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: null,
    };
  }

  validateInput = (e) => {
    const { target } = e;
    const data = Input.getInputData(e);
    if (target.value.length) {
      let { error } = this.state;
      const result = userValidator.validateField(data);
      error = { ...error, ...result };
      this.setState({ error });
    }
  };

  updateState = (data) => {
    const { error } = this.state;
    if (error) {
      Object.keys(data)
        .forEach((name) => {
          error[name] = null;
        });
    }
    this.setState({
      ...data,
      error
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const error = userValidator.validateField({ email });
    if (!error) {
      this.props.onSubmit(email);
    } else {
      this.setState({ error });
    }
  };

  render() {
    const { email, error } = this.state;
    let emailError;
    if (error) {
      emailError = error.email;
    }
    return (
      <form id={'resendLinkForm'} className={'verification-form'} onSubmit={this.onSubmit}>
        <h1>{'Resend verification link to your email'}</h1>
        <Input
          type={'email'}
          iconType={'envelope'}
          field={'email'}
          value={email}
          fieldError={(emailError) ? emailError[0] : null}
          validateField={this.validateInput}
          onUpdate={this.updateState}/>
        <button
          type={'submit'}
          className={`button is-primary is-medium is-fullwidth ${(this.props.loading) ? 'is-loading' : ''}`}>
          Resend
        </button>
      </form>
    );
  }
}

ReVerificationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.any,
  error: PropTypes.any,
};

export default ReVerificationForm;

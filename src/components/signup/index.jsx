import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Presentation from './presentation';
import { registerUser } from '../../redux/actions/auth/register';

export function SignUp(props) {
  return (
    <Presentation onSubmit={props.registerUser}/>
  );
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { registerUser })(SignUp));

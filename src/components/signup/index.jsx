import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/auth/register';
import Presentation from './presentation';

export function SignUp(props) {
  return (
    <Presentation onSubmit={props.registerUser}/>
  );
}

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user))
});

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));

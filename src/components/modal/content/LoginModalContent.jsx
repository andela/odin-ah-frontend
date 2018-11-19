import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLoginRequest } from '../../../redux/actions/auth/login';
import LoginView from '../../login/LoginView';
import { dismissModal } from '../../../redux/actions/modal';

export const LoginModal = (props) => {
  if (props.isAuthenticated === true) {
    let to = '/';
    if (props.referrer && props.referrer.from) {
      to = props.referrer.from;
    }
    props.dismissModal();
    return <Redirect to={to}/>;
  }
  return (
    <div className="content">
      <LoginView loading={props.loading} onSubmit={props.userLoginRequest}/>
    </div>
  );
};

LoginModal.propTypes = {
  referrer: PropTypes.shape({
    from: PropTypes.string,
  }),
  userLoginRequest: PropTypes.func,
  dismissModal: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading,
  referrer: state.redirect.referrer,
});

export default connect(mapStateToProps, {
  userLoginRequest,
  dismissModal
})(LoginModal);

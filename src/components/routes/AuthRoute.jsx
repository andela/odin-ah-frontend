import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { redirectToReferrer } from '../../redux/actions/redirect';

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      const {
        location, redirectToReferrer: referrer,
      } = rest;

      referrer(location.pathname);
      return <Redirect to="/?login"/>;
    }
    }
  />
);

AuthRoute.propTypes = {
  location: PropTypes.object,
  redirectToReferrer: PropTypes.func,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  redirectTo: state.redirect.redirectTo,
});

export default connect(mapStateToProps, {
  redirectToReferrer,
})(AuthRoute);

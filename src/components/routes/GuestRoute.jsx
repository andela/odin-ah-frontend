import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GeustRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)
    }
  />
);

GeustRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
}

export default connect(mapStateToProps)(GeustRoute);

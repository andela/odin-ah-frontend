import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardView from './DashboardView';
import { profileData } from '../../redux/actions/profile';
import { logout } from '../../redux/actions/auth/login';

export class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 'profile'
    };
  }

  componentDidMount() {
    this.props.profileData();
  }

  handleRouteChange = (route) => {
    this.setState({ active: route });
  };

  render() {
    return (
      <DashboardView
        match={this.props.match}
        activeRoute={this.state.active}
        handleRouteChange={this.handleRouteChange}
        profiledata={this.props.profiledata}
        isAuthenticated={this.props.isAuthenticated}
        handleLogout={this.props.handleLogout}
      />
    );
  }
}

DashboardContainer.propTypes = {
  match: PropTypes.object,
  profileData: PropTypes.func,
  profiledata: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func
};

const mapStateToProps = state => ({
  profiledata: state.profile,
  isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = {
  profileData,
  handleLogout: logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

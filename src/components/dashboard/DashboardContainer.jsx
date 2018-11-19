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
      isProfileActive: true,
      isStatisticsActive: false
    };
  }

  componentDidMount() {
    this.props.profileData();
  }

  handleProfileButton = () => {
    this.setState({
      isProfileActive: true,
      isStatisticsActive: false,
    });
  };

  handleStatisticsButton = () => {
    this.setState({
      isProfileActive: false,
      isStatisticsActive: true,
    });
  };

  render() {
    const eventHandler = {
      handleProfileButton: this.handleProfileButton,
      handleStatisticsButton: this.handleStatisticsButton
    };
    return <DashboardView match={this.props.match}
    profiledata={ this.props.profiledata } { ...this.state } { ...eventHandler }
    isAuthenticated={this.props.isAuthenticated} handleLogout={this.props.handleLogout}/>;
  }
}


DashboardContainer.propTypes = {
  match: PropTypes.object,
  profileData: PropTypes.func,
  profiledata: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  profiledata: state.profile,
  isAuthenticated: state.login.isAuthenticated,
});

const mapDispatchToProps = {
  profileData,
  handleLogout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

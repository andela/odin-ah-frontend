import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardView from './DashboardView';
import { profileData } from '../../redux/actions/profile';

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

  handleProfileButton = (e) => {
    this.setState({
      isProfileActive: true,
      isStatisticsActive: false,
    });
  };

  handleStatisticsButton =(e) => {
    this.setState({
      isProfileActive: false,
      isStatisticsActive: true,
    });
  }

  render() {
    const eventHandler = {
      handleProfileButton: this.handleProfileButton,
      handleStatisticsButton: this.handleStatisticsButton
    };
    return <DashboardView match={this.props.match} profiledata={ this.props.profiledata } { ...this.state } { ...eventHandler }/>;
  }
}


DashboardContainer.propTypes = {
  match: PropTypes.object.isRequired,
  profileData: PropTypes.func.isRequired,
  profiledata: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiledata: state.profile,
});

const mapDispatchToProps = {
  profileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileContainer from '../profile/ProfileContainer';
import StastisticsConatiner from '../statistics/StastisticsConatiner';
import './dashboard.scss';
import FollowListView from '../users/FollowListView';
import FollowerListView from '../users/FollowerListView';

const DashboardView = ({
  match, profiledata, activeRoute, handleRouteChange
}) => (
  <div>
    <Fragment>
      <div className="container-dash">
        <div className="header-sub">
          <header className="dashboard-label"> Dashboard</header>
        </div>
        <section className="section-wrapper">
          <div className="right-pane">
            <Link
              className={`btn-profile ${activeRoute === 'profile' ? ' btn-active' : ''}`}
              onClick={() => handleRouteChange('profile')}
              to={`${match.url}`}
            >
              <span>Profile</span>
            </Link>
            <Link
              className={`btn-statistics ${activeRoute === 'statistics' ? 'btn-active' : ''}`}
              onClick={() => handleRouteChange('statistics')}
              to={`${match.url}/statistics`}
            >
              <span>Statistics</span>
            </Link>
          </div>
          <div className="left-pane">
            <Route
              exact
              path={`${match.url}`}
              render={props => <ProfileContainer {...props} profiledata={profiledata} />}
            />
            <Route exact path={`${match.url}/following`} component={FollowListView} />
            <Route exact path={`${match.url}/followers`} component={FollowerListView} />
            <Route path={`${match.url}/statistics`} component={StastisticsConatiner} />
          </div>
        </section>
      </div>
    </Fragment>
  </div>
);

DashboardView.propTypes = {
  match: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
  profiledata: PropTypes.object,
  activeRoute: PropTypes.string,
  handleRouteChange: PropTypes.func
};

export default DashboardView;

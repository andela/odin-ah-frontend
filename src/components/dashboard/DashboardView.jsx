import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileContainer from '../profile/ProfileContainer';
import Statistics from '../statistics/StastisticsView';
import NavBarContainer from '../header/NavBarContainer';
import './dashboard.scss';

const DashboardView = ({
 match, profiledata, isProfileActive, handleProfileButton, isStatisticsActive, handleStatisticsButton, isAuthenticated, handleLogout
}) => (
    <div>
        <NavBarContainer userIsAuthenticated={isAuthenticated}
            handleLogout={handleLogout} />
         <Fragment >
            
         <div className='container-dash'>
             <div className='header-sub'>
                 <header className='dashboard-label'> Dashboard</header>
             </div>
             <section className='section-wrapper'>
                 <div className='right-pane'>
                <Link className={`btn-profile ${isProfileActive ? ' btn-active' : ''}`} onClick={handleProfileButton} to={`${match.url}`}><span>Profile</span></Link>
                <Link className={`btn-statistics ${isStatisticsActive ? 'btn-active' : ''}`} onClick={ handleStatisticsButton } to={`${match.url}/statistics`}><span>Statistics</span></Link>
                 </div>
                 <div className='left-pane'>
                 <Route exact path={`${match.url}`} render={ props => <ProfileContainer {...props} profiledata={ profiledata } />
                     }/>
                 <Route path={`${match.url}/statistics`} component={Statistics} /></div>
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
  isProfileActive: PropTypes.bool,
  handleProfileButton: PropTypes.func,
  handleStatisticsButton: PropTypes.func,

  isStatisticsActive: PropTypes.bool,
};

export default DashboardView;

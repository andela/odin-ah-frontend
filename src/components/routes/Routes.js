import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Toast from '../notification/toast';
import Modal from '../modal';
import VerifyEmail from '../signup/verifyEmail';
import ReVerifyEmail from '../signup/reverifyEmail';
import SocialLogin from '../login/SocialLogin';
import DashboardContainer from '../dashboard/DashboardContainer';
import CreateArticle from '../article/createArticle/createArticle';
import UpdateArticle from '../article/updateArticle/updateArticle';
import ResetPasswordPage from '../passwordReset/ResetPasswordPage';
import ResetPasswordForm from '../passwordReset/ResetPasswordForm';
import LandingPageContainer from '../landingPage/LandingPageContainer';
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';
import ReadArticle from '../article/readArticle';


const Routes = ({ location }) => (
  <div>
    <Switch>
      <Route exact={true} path='/' component={LandingPageContainer}/>
      <Route exact={true} path='/home' component={Home}/>
      <AuthRoute
        location={location}
        path="/article/new"
        component={CreateArticle}
      />
      <AuthRoute
        location={location}
        path="/article/edit/:slug"
        component={UpdateArticle}
      />
      <Route path='/article/:slug' component={ReadArticle}/>
      <GuestRoute
        location={location}
        path="/auth/confirmation/:token"
        exact
        component={VerifyEmail}
      />
      <GuestRoute
        location={location}
        path="/auth/social"
        exact
        component={SocialLogin}
      />
      <GuestRoute
        location={location}
        path="/reset-password"
        exact
        component={ResetPasswordPage}
      />
      <GuestRoute
        location={location}
        path="/reset-password/complete/:token"
        exact
        component={ResetPasswordForm}
      />
      <GuestRoute
        location={location}
        path="/email-verification/resend"
        exact
        component={ReVerifyEmail}
      />
      <AuthRoute
        location={location}
        path="/dashboard"
        component={DashboardContainer}
      />
    </Switch>
    <Modal/>
    <Toast/>
  </div>
);

Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
};

export default connect()(Routes);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.scss';

const HeaderView = props => (
  <header className="header">
    <div className="header__hero">
      <div className='bg'/>
      <div className="hero__content-wrapper">
        <h1 className="hero__title">Learn. Write. Share</h1>
        <div className="hero__subtitle">
          Join a community of like-minded authors who innovate and inspire by writing and sharing
          their thoughts
        </div>
        <div className="hero__cta">
          {!props.userIsAuthenticated ? (!props.loadingArticles
            && <div className="btn publish-cta" onClick={props.handleSignup}>
              Get Started
            </div>
          ) : (!props.loadingArticles
            && <Link className="btn publish-cta" to="/article/new">
              Start Writing
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
);

HeaderView.propTypes = {
  userIsAuthenticated: PropTypes.bool,
  loadingArticles: PropTypes.bool,
  handleSignup: PropTypes.func,
};

export default HeaderView;

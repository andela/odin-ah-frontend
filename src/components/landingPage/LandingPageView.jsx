import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../header/HeaderContainer';
import ArticleListView from '../articleList/ArticleListView';
import BigTagList from '../articleList/BigTagList';
import FooterView from '../footer/FooterView';
import PageLoader from '../PageLoader';
import { Alert } from '../notification/alert';

const LandingPageView = props => (
  <div className="landing-page">
    <HeaderContainer {...props} />
    <div className="landing-page__main">
      <Alert />
      <section className="landing-page__content">
        <div className="featured-articles__wrapper">
          <h2 className="featured-articles__title">Featured Articles</h2>
          {!props.loadingArticles && <ArticleListView articles={props.articles} />}
          {props.loadingArticles && <PageLoader text={'loading...'} />}
          <div className="featured-articles__control">
            <div
              className="featured-articles__more-btn js-next-btn"
              onClick={() => props.handleFetchArticlePage(1)}
            >
              NEXT&nbsp;
              <i className="fas fa-arrow-right" />
            </div>
            <div
              className="featured-articles__more-btn js-prev-btn"
              onClick={() => props.handleFetchArticlePage(-1)}
            >
              <i className="fas fa-arrow-left" />
              &nbsp;PREVIOUS
            </div>
          </div>
        </div>
      </section>
      <aside className="landing-page__sidebar">
        <div className="popular-tags__wrapper">
          <h5 className="popular-tags__title">Popular Topics</h5>
          <BigTagList tags={props.ptags} />
        </div>
      </aside>
    </div>
    <FooterView />
  </div>
);

LandingPageView.propTypes = {
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  articles: PropTypes.array,
  ptags: PropTypes.array,
  handleFetchMoreArticles: PropTypes.func
};

export default LandingPageView;

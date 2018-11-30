import React from 'react';
import PropTypes from 'prop-types';
import ArticleListView from '../articleList/ArticleListView';
import Alert from '../notification/alert';
import './bookmark.scss';

const BookmarkView = (props) => {
  return (
    <div className="bookmark_wrapper">
    <Alert/>
     <section className="landing-page__content">
        <div className="featured-articles__wrapper">
          <h2 className="featured-articles__title">Bookmarks</h2>
          <ArticleListView articles={props.articles} handleDeleteBookmark={props.handleDeleteBookmark} />
          <div className="featured-articles__control">
            <div
              className="featured-articles__more-btn js-next-btn"
              onClick={() => props.handleFetchArticlePage(1)}
            >
              NEXT&nbsp;
              <i className="fas fa-arrow-right"/>
            </div>
            <div
              className="featured-articles__more-btn js-prev-btn"
              onClick={() => props.handleFetchArticlePage(-1)}
            >
              <i className="fas fa-arrow-left"/>
              &nbsp;PREVIOUS
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};

BookmarkView.propTypes = {
  isAuthenticated: PropTypes.bool,
  articles: PropTypes.array,
  handleFetchArticlePage: PropTypes.func,
  handleDeleteBookmark: PropTypes.func,
};

export default BookmarkView;

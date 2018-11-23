import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookmarkView from './BookmarkView';
import { fetchBookmarkArticle, removeBookmarkArticle, fetchArticlePage } from '../../redux/actions/articles/bookmark';
import PageLoader from '../PageLoader';


export class BookmarkContainer extends Component {
  componentDidMount() {
    this.props.fetchBookmarkArticle();
  }

  handleFetchArticlePage = (page) => {
    this.props.fetchArticlePage(page);
  };

  handleDeleteBookmark  = (e) => {
    const slug = e.target.getAttribute('data-slug');
    this.props.removeBookmarkArticle(slug);
    this.props.fetchBookmarkArticle();
  };

  render() {
    return (
             <Fragment>
            {this.props.loadingArticles && <PageLoader text="Loading..." />}
                <BookmarkView isAuthenticated={this.props.isAuthenticated}
                   articles={this.props.articles}
                   handleFetchArticlePage={this.handleFetchArticlePage}
                   loadingArticles={this.props.loadingArticles}
                   handleDeleteBookmark={this.handleDeleteBookmark}
                />
            </Fragment>
    );
  }
}

BookmarkContainer.propTypes = {
  isAuthenticated: PropTypes.bool,
  loadingArticles: PropTypes.bool,
  fetchBookmarkArticle: PropTypes.func,
  articles: PropTypes.array.isRequired,
  handleDeleteBookmark: PropTypes.func,
  removeBookmarkArticle: PropTypes.func,
  fetchArticlePage: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  loadingArticles: state.bookmark.loadingArticles,
  articles: state.bookmark.articlesInView,
});

const mapDispatchToProps = {
  fetchBookmarkArticle,
  removeBookmarkArticle,
  fetchArticlePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkContainer);

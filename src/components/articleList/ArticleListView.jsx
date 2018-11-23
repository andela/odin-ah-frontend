import React from 'react';
import PropTypes from 'prop-types';
import ArticleCardView from './ArticleCardView';

// eslint-disable-next-line max-len
const ArticleListView = ({ articles, handleDeleteBookmark }) => articles.map(article => <ArticleCardView key={article.slug} handleDeleteBookmark={handleDeleteBookmark }article={article} />);

ArticleListView.propTypes = {
  handleDeleteBookmark: PropTypes.func,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      readingTime: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      author: PropTypes.object,
      reaction: PropTypes.object,
    })
  )
};

export default ArticleListView;

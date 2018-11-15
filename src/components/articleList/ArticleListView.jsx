import React from 'react';
import PropTypes from 'prop-types';
import ArticleCardView from './ArticleCardView';

// eslint-disable-next-line max-len
const ArticleListView = ({ articles }) => articles.map(article => <ArticleCardView key={article.slug} article={article} />);

ArticleListView.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      readingTime: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
      reaction: PropTypes.object.isRequired
    })
  )
};

export default ArticleListView;

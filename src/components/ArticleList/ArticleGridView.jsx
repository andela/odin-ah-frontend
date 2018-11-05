import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import './ArticleList.scss';

const ArticleGridView = ({ articles }) => (
  <div className="columns is-multiline">
    {articles.map(article => (
      <div key={article.slug} className="column is-one-third">
        <ArticleCard {...article} />
      </div>
    ))}
  </div>
);

ArticleGridView.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      readingTime: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
      slug: PropTypes.string.isRequired
    })
  )
};

export default ArticleGridView;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ArticleCard.scss';
import transformDate from '../../utils/dateTransformer';
import ArticleImage from './ArticleImage';

const ArticleCardView = (props) => {
  const {
    createdAt,
    readingTime,
    title,
    description,
    slug,
    author,
    reaction,
    imageUrl
  } = props.article;
  const { day, month } = transformDate(createdAt);
  return (
    <div className="article-card">
      <div className="article-card__image">
        <ArticleImage backgroundImageUrl={imageUrl} altText={title} />
      </div>
      <div className="article-card__content">
        <div className="article-content__wrapper">
          <p className="article-card__title">
            <Link to={`/articles/${slug}`} style={{ color: 'inherit' }}>
              {title}
            </Link>
          </p>
          <p className="article-card__desc">{description}</p>
          <p className="article-card__author">{author.name}</p>
          <div className="article-card__footer">
            <div className="article-card__footer--left">
              <span className="footer__item">{`${day} ${month}`}</span>
              <span className="footer__item">
                {(parseInt(readingTime, 10) / (1000 * 60)).toFixed(0)} min read
              </span>
            </div>
            <div className="article-card__footer--right">
              <span className="footer__item">
                <i className="fa fa-thumbs-up" />
                &nbsp;
                {reaction.likeCount}
              </span>
              <span className="footer__item">
                <i className="fa fa-thumbs-down" />
                &nbsp;
                {reaction.dislikeCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticleCardView.propTypes = {
  article: PropTypes.object.isRequired
};

export default ArticleCardView;

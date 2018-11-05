import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagList from './TagList';
import CircularDateView from './CircularDateView';

const ArticleCard = (props) => {
  const {
    createdAt, readingTime, title, description, tags, slug
  } = props;
  return (
    <div className="card-image article-card">
      <figure className="image is-3by2">
        <img src="https://picsum.photos/480/320" alt="Placeholder" />
      </figure>
      <CircularDateView date={createdAt} styles={{ position: 'absolute', top: 10, left: 10 }} />
      <div className="card-content">
        <p className="title is-5">
          <Link to={`/articles/read/${slug}`}>{title}</Link>
        </p>
        <TagList tags={tags} />
        <br />
        <br />
        <div className="content">{description}</div>
        <div className="content">
          <div className="level is-mobile">
            <div className="level-left">
              <span className="level-item article-meta">
                <span className="icon is-small">
                  <i className="fas fa-clock" />
                </span>
                &nbsp;
                {(parseInt(readingTime, 10) / (1000 * 60)).toFixed(0)} min read
              </span>
            </div>
            <div className="level-right">
              <span className="level-item article-meta">
                <span className="icon is-small">
                  <i className="fa fa-thumbs-up" />
                </span>
                1k
              </span>
              <span className="level-item article-meta">
                <span className="icon is-small">
                  <i className="fa fa-thumbs-down" />
                </span>
                200
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  createdAt: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired
};

export default ArticleCard;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ItemView extends Component {
  onViewClicked = () => {
    if (this.props.onItemClicked) {
      this.props.onItemClicked();
    }
  };

  render() {
    const { item, type } = this.props;

    const hasTag = type === 'tag';
    const hasArticle = type === 'article';
    const searchTag = (hasTag) ? ' tag-content' : '';
    const {
      title, slug, imageUrl, tag
    } = item;

    const styles = {
      backgroundImage: imageUrl
        ? `url(${imageUrl})`
        : 'url(\'http://picsum.photos/500\')',
    };
    return (
      <div className='search-item-wrapper'>
        <div onClick={this.onViewClicked}>
          {hasArticle && <Link to={`/article/${slug}`}/>}
          {hasTag && <Link to={`/tag/${tag}`}/>}
        </div>
        {hasArticle && <div className='image' style={styles}/>}
        {hasTag && <div className='tag-image'><i className="fas fa-hashtag"/></div>}
        <div className={`content${searchTag}`}>
          <p>{title || tag}</p>
        </div>
      </div>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object,
  type: PropTypes.oneOf(['tag', 'article']),
  onItemClicked: PropTypes.func,
};

ItemView.defaultProps = {};

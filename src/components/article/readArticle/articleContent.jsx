import PropTypes from 'prop-types';
import React from 'react';
import ProfileView from './profileView';
import TagPillContainer from './tagPillContainer';
import Notification from '../../notification';
import SideTool from './sideTool';

export default function ArticleContent(props) {
  const {
    onDropDownItemClicked, dropDownItems, article, handleBookmark, handleInteraction
  } = props;
  const {
    title, body, author, tags, parsedDate, readingTime, reaction, hasBookmarked
  } = article;
  return (
    <section className={'section show-butter'}>
      <div className='container form'>
        <div className='columns'>
          <div className='column'>
            <div className='article-form'>
              <div className='input-group'>
                <div className={'title-input'}>
                  <h1>{title}</h1>
                </div>
              </div>
              <ProfileView date={parsedDate} readTime={readingTime} user={author}/>
              <TagPillContainer tags={tags}/>
              <div className='input-group'>
                <div dangerouslySetInnerHTML={Notification.createMarkup(body)}
                     className={'body-input'}>
                </div>
                <SideTool {...{
                  onDropDownItemClicked,
                  dropDownItems,
                  reaction,
                  hasBookmarked,
                  handleBookmark,
                  handleInteraction,
                }}/>
                <hr/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ArticleContent.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    hasBookmarked: PropTypes.bool,
    readingTime: PropTypes.number,
    author: PropTypes.object,
    reaction: PropTypes.object,
    tags: PropTypes.array,
  })
};

ArticleContent.defaultProps = {};

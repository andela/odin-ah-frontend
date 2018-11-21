import PropTypes from 'prop-types';
import React from 'react';
import SideToolDropDownMenu from './dropDownMenu';

import dislike from './images/dislike-button.svg';
import like from './images/like-button.svg';
import comment from './images/comments.svg';
import share from './images/share-button.svg';
import { reactionCountToString } from '../../../utils';


export default function SideTool(props) {
  const { reaction, hasBookmarked, onDropDownItemClicked, dropDownItems, handleBookmark } = props;
  const { likeCount, dislikeCount, commentCount } = reaction;
  return (
    <div className='side-tool'>
      <div title='Like' className='side-tool__item'>
        <span className='side-tool__item__label'>
          {reactionCountToString(likeCount)}
        </span>
        <img alt='like button' className='side-tool__item__icon' src={like}/>
      </div>
      <div title='Dislike' className='side-tool__item side-tool__item_dislike'>
        <span className='side-tool__item__label side-tool__item__label_dislike'>
          {reactionCountToString(dislikeCount)}
        </span>
        <img alt='dislike button' className='side-tool__item__icon side-tool__item__icon_dislike'
             src={dislike}/>
      </div>
      <div title='Comment' className='side-tool__item'>
        <span className='side-tool__item__label'>
          {reactionCountToString(commentCount)}
        </span>
        <img alt='comment button' className='side-tool__item__icon' src={comment}/>
      </div>
      <div title='Bookmark' className='side-tool__item'>
        <span/>
        <div className={`side-tool__item__icon side-tool__item__icon_bookmark ${ hasBookmarked ? 'is__bookmarked':'' } `} onClick={ handleBookmark }>
        <i className="fas fa-bookmark"></i>
        </div>
      </div>
      <div title='Share' className='side-tool__item'>
        <span/>
        <img alt='share button' className='side-tool__item__icon' src={share}/>
      </div>
      {
        dropDownItems.length === 1
        && <div title='Share' className='side-tool__item'>
          <span/>
          <i title='Report Article' className="fa fa-flag side-tool__item__icon"
             aria-hidden="true"/>
        </div>
      }
      {
        dropDownItems.length > 1
        && <div className={'side-tool__item'}>
          <span/>
          <SideToolDropDownMenu
            onDropDownItemClicked={onDropDownItemClicked}
            dropDownItems={dropDownItems}/>
        </div>
      }
    </div>
  );
}

SideTool.propTypes = {
  handleBookmark: PropTypes.func,
  onDropDownItemClicked: PropTypes.func,
  dropDownItems: PropTypes.array,
  hasBookmarked: PropTypes.bool,
  reaction: PropTypes.shape({
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    commentCount: PropTypes.number,
  })
};

SideTool.defaultProps = {};

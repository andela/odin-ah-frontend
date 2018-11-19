import PropTypes from 'prop-types';
import React from 'react';
import SideToolDropDownMenu from './dropDownMenu';

import dislike from './images/dislike-button.svg';
import like from './images/like-button.svg';
import comment from './images/comments.svg';
import share from './images/share-button.svg';
import bookmark from './images/bookmark.svg';
import { reactionCountToString } from '../../../utils';


export default function SideTool(props) {
  const { reaction, onDropDownItemClicked, dropDownItems } = props;
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
        <img alt='bookmark button' className='side-tool__item__icon side-tool__item__icon_bookmark'
             src={bookmark}/>
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
  onDropDownItemClicked: PropTypes.func,
  dropDownItems: PropTypes.array,
  reaction: PropTypes.shape({
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    commentCount: PropTypes.number,
  })
};

SideTool.defaultProps = {};

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SideToolDropDownMenu from './dropDownMenu';
import dislike from './images/dislike-button.svg';
import disliked from './images/disliked-button.svg';
import like from './images/like-button.svg';
import liked from './images/liked-button.svg';
import share from './images/share-button.svg';
import { reactionCountToString } from '../../../utils';


export default class SideTool extends Component {
  handleInteraction = (e) => {
    const action = e.target.getAttribute('data-action');
    const { status: prevStatus } = this.props.reaction;
    if (prevStatus === action) {
      return this.props.handleInteraction(prevStatus, 'neutral');
    } if (action === 'like') {
      this.props.handleInteraction(prevStatus, action);
    } else if (action === 'dislike') {
      this.props.handleInteraction(prevStatus, action);
    }
  };

  render() {
    const {
      reaction, hasBookmarked, onDropDownItemClicked, dropDownItems, handleBookmark
    } = this.props;
    const {
      likeCount, dislikeCount, hasReacted, status
    } = reaction;
    const likeImage = hasReacted && status === 'like' ? liked : like;
    const dislikeImage = hasReacted && status === 'dislike' ? disliked : dislike;
    return (
    <div className='side-tool'>
      <div title='Like' className='side-tool__item'>
        <span className='side-tool__item__label'>
          {reactionCountToString(likeCount)}
        </span>
        <img alt='like button' data-action='like' className='side-tool__item__icon' src={likeImage} onClick={this.handleInteraction}/>
      </div>
      <div title='Dislike' className='side-tool__item side-tool__item_dislike'>
        <span className='side-tool__item__label side-tool__item__label_dislike'>
          {reactionCountToString(dislikeCount)}
        </span>
        <img alt='dislike button' data-action='dislike' className='side-tool__item__icon side-tool__item__icon_dislike'
             src={dislikeImage} onClick={this.handleInteraction}/>
      </div>
      <div title='Bookmark' className='side-tool__item'>
        <span/>
        <div className={`side-tool__item__icon side-tool__item__icon_bookmark ${hasBookmarked ? 'is__bookmarked' : ''} `} onClick={ handleBookmark }>
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
}
SideTool.propTypes = {
  handleBookmark: PropTypes.func,
  onDropDownItemClicked: PropTypes.func,
  dropDownItems: PropTypes.array,
  hasBookmarked: PropTypes.bool,
  handleInteraction: PropTypes.func.isRequired,
  reaction: PropTypes.shape({
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    hasReacted: PropTypes.bool,
    status: PropTypes.oneOf(['like', 'dislike', 'neutral'])
  })
};

SideTool.defaultProps = {};

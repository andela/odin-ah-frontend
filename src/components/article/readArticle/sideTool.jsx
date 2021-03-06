import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SideToolDropDownMenu from './dropDownMenu';
import dislike from './images/dislike-button.svg';
import disliked from './images/disliked-button.svg';
import like from './images/like-button.svg';
import liked from './images/liked-button.svg';
import FacebookShareButton from '../../socialShareButtons/facebookShareButton';
import TwitterShareButton from '../../socialShareButtons/twitterShareButton';
import { reactionCountToString } from '../../../utils';

export default class SideTool extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      likeCount: 0,
      dislikeCount: 0
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { likeCount, dislikeCount } = props.reaction;
    this.setState({
      likeCount,
      dislikeCount,
      loading: false
    });
  }

  handleInteraction = (e) => {
    const action = e.target.getAttribute('data-action');
    const { status: prevStatus } = this.props.reaction;
    if (this.state.loading) return;
    if (prevStatus === action) {
      this.setState(prevState => ({
        loading: true,
        likeCount: action === 'like' ? prevState.likeCount - 1 : prevState.likeCount,
        dislikeCount: action === 'dislike' ? prevState.dislikeCount - 1 : prevState.dislikeCount
      }));
      this.props.handleInteraction(prevStatus, 'neutral');
    } else if (action === 'like') {
      this.setState(prevState => ({
        loading: true,
        likeCount: prevState.likeCount + 1
      }));
      this.props.handleInteraction(prevStatus, action);
    } else if (action === 'dislike') {
      this.setState(prevState => ({
        loading: true,
        dislikeCount: prevState.dislikeCount + 1
      }));
      this.props.handleInteraction(prevStatus, action);
    }
  };

  render() {
    const {
      reaction,
      hasBookmarked,
      onDropDownItemClicked,
      dropDownItems,
      handleBookmark,
      slug,
      imageUrl
    } = this.props;
    const { hasReacted, status } = reaction;
    const { likeCount, dislikeCount } = this.state;
    const likeImage = hasReacted && status === 'like' ? liked : like;
    const dislikeImage = hasReacted && status === 'dislike' ? disliked : dislike;
    return (
      <div className="side-tool">
        <div title="Like" className="side-tool__item">
          <span className="side-tool__item__label side-tool__item__label_like">
            {reactionCountToString(likeCount)}
          </span>
          <img
            alt="like button"
            data-action="like"
            className="side-tool__item__icon"
            src={likeImage}
            onClick={this.handleInteraction}
          />
        </div>
        <div title="Dislike" className="side-tool__item side-tool__item_dislike">
          <span className="side-tool__item__label side-tool__item__label_dislike">
            {reactionCountToString(dislikeCount)}
          </span>
          <img
            alt="dislike button"
            data-action="dislike"
            className="side-tool__item__icon side-tool__item__icon_dislike"
            src={dislikeImage}
            onClick={this.handleInteraction}
          />
        </div>
        <div title="Bookmark" className="side-tool__item">
          <span />
          <div
            className={`side-tool__item__icon side-tool__item__icon_bookmark ${
              hasBookmarked ? 'is__bookmarked' : ''
            } `}
            onClick={handleBookmark}
          >
            <i className="fas fa-bookmark" />
          </div>
        </div>
        <div title="Share" className="side-tool__item">
          <span />
          <FacebookShareButton slug={slug} imageUrl={imageUrl} />
        </div>
        <div title="Share" className="side-tool__item">
          <span />
          <TwitterShareButton slug={slug} imageUrl={imageUrl} />
        </div>

        {dropDownItems.length === 1 && (
          <div title="Share" className="side-tool__item">
            <span />
            <i
              title="Report Article"
              className="fa fa-flag side-tool__item__icon"
              aria-hidden="true"
            />
          </div>
        )}
        {dropDownItems.length > 1 && (
          <div className={'side-tool__item'}>
            <span />
            <SideToolDropDownMenu
              onDropDownItemClicked={onDropDownItemClicked}
              dropDownItems={dropDownItems}
            />
          </div>
        )}
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

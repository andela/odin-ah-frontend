import React from 'react';
import { shallow } from 'enzyme';
import CommentBox from '../../../components/comment/CommentBox';
import SingleComment from '../../../components/comment/SingleComment';

describe('CommentBox', () => {
  it('should render without crashon', () => {
    const comments = [
      {
        body: 'awesome article',
        author: {
          username: 'mentos',
          imageUrl: 'cloud.moc/image'
        }
      },
      {
        body: 'Quite concise and on point',
        author: {
          username: 'hameed',
          imageUrl: 'cloud.moc/image'
        }
      }
    ];
    const wrapper = shallow(
      <CommentBox
        commentInputValue=''
        onCommentClick={() => {}}
        onChange={() => {}}
        comments={ comments }
        userImage='link://to/image'
        onFocus={() => {}}
        onBlur={() => {}}
        readyToType={true}
      />
    );
    expect(wrapper.find(SingleComment)).toHaveLength(2);
  });
});

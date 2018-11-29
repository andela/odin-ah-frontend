import React from 'react';
import { shallow } from 'enzyme';
import FacebookShareButton from '../../components/socialShareButtons/facebookShareButton';
import TwitterShareButton from '../../components/socialShareButtons/twitterShareButton';

describe('SocialShare', () => {
  test('should share article on facebook ', () => {
    const props = {
      slug: 'test-follow-title-EZW0JNVg',
      imageUrl: ''
    };
    const wrapper = shallow(
      <FacebookShareButton
        slug={props.slug}
         imageUrl={ props.imageUrl}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
  test('should share article on facebook ', () => {
    const props = {
      slug: 'test-follow-title-EZW0JNVg',
    };
    const wrapper = shallow(
      <TwitterShareButton
        slug={props.slug}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });
});

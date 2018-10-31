import { shallow } from 'enzyme/build';
import React from 'react';
import SocialButton from '../../../components/signup/social';

test('should render InputStatusIcon without crashing', () => {
  shallow(<SocialButton social={'google'} type={'signin'}/>);
  shallow(<SocialButton social={'facebook'} type={'signup'}/>);
});

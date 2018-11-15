import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from '../../../../components/404/PageNotFound';

describe('PageNotFound', () => {
  it('should render PageNotFound without crashing', (done) => {
    const wrapper = shallow(<PageNotFound />);
    expect(wrapper.find('.section__404')).toHaveLength(1);
    done();
  });
});

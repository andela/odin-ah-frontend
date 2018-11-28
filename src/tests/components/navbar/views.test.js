import React from 'react';
import { shallow } from 'enzyme';
import CategoryHeader from '../../../components/navbar/search/CategoryHeader';
import EmptyItemView from '../../../components/navbar/search/emptyItemView';
import MenuHeader from '../../../components/navbar/search/menuHeader';
import ItemView from '../../../components/navbar/search/itemView';

test('renders PageLoader component without crashing', () => {
  shallow(<CategoryHeader title={'test'}/>);
});
test('renders EmptyItemView component without crashing', () => {
  shallow(<EmptyItemView text={'test'}/>);
});

test('renders EmptyItemView component without crashing', () => {
  shallow(<MenuHeader text={'test'}/>);
});

test('renders ItemView as tag component without crashing', () => {
  shallow(<ItemView type='tag' item={{ tag: 'tag' }}/>);
});

test('renders ItemView as article tag component without crashing', () => {
  const item = {
    slug: 'slug',
    imageUrl: 'imageUrl',
    title: 'title'
  };
  shallow(<ItemView type='article' item={item}/>);
});

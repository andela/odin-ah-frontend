import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import ShallowWrapper from 'enzyme/ShallowWrapper';
// eslint-disable-next-line import/no-extraneous-dependencies
import extConfigure from '@commercetools/enzyme-extensions';

configure({ adapter: new Adapter() });
extConfigure(ShallowWrapper);

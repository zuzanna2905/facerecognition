import {shallow} from 'enzyme';
import React from 'react';
import App from '../App';
import { wrap } from 'module';

let wrapper;
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

beforeEach(() => {
  wrapper = shallow(<App />);
})

it('renders App without crashing', () => {
  expect(wrapper).toMatchSnapshot();
});

it('route to signout', () => {
  wrapper.instance().onRouteChange('signout');
  expect(wrapper.state()).toEqual(initialState);
})

it('route to home', () => {
  const expectedState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'home',
    isSignedIn: true,
    user: {
      id: '',
      name: '',
      email: '',
      entries: '',
      joined: ''
    }
  }
  wrapper.instance().onRouteChange('home');
  expect(wrapper.state()).toEqual(expectedState);
})

it('wrong input data in facelocation action', () => {
  expect(wrapper.instance().calculateFaceLocation([])).toEqual({});
})

it('wrong input data in facelocation action', () => {
  const image = '';
  expect(wrapper.instance().calculateFaceLocation([])).toEqual({});
})

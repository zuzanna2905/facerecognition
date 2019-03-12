import {shallow} from 'enzyme';
import React from 'react';
import App from '../App';

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
    entries: 0,
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
      entries: 0,
      joined: ''
    }
  }
  wrapper.instance().onRouteChange('home');
  expect(wrapper.state()).toEqual(expectedState);
})

it('good input data in facelocation action', () => {
 // expect(wrapper2.instance().(image)).toEqual({});
})

it('wrong input data in facelocation action', () => {
  //expect(wrapper.instance().calculateFaceLocation('')).toEqual({});
})

it('entries actualization action', () => {
  const mockUser = {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
    entries: 0,
    joined: new Date()
  }
  expect(parseInt(wrapper.state().user.entries)).toEqual(0);
  wrapper.instance().loadUser(mockUser);
})
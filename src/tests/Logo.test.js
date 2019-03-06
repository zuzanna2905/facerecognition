import {shallow} from 'enzyme';
import React from 'react';
import Logo from '../component/Logo/Logo';

it('renders Logo without crashing', () => {
    let  wrapper = shallow(<Logo/>);
    expect(wrapper).toMatchSnapshot();
});
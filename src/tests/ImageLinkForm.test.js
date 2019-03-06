import {shallow} from 'enzyme';
import React from 'react';
import ImageLinkForm from '../component/ImageLinkForm/ImageLinkForm';

it('renders ImageLinkForm without crashing', () => {
    let  wrapper = shallow(<ImageLinkForm/>);
    expect(wrapper).toMatchSnapshot();
});
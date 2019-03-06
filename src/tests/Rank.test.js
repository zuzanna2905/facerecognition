import {shallow} from 'enzyme';
import React from 'react';
import Rank from '../component/Rank/Rank';

it('renders Rank without crashing', () => {
    const initialProps = {
        name: 'John', 
        entries: 3
    }
    let  wrapper = shallow(<Rank {...initialProps}/>);
    expect(wrapper).toMatchSnapshot();
});
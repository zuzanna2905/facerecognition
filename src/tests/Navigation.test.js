import {shallow} from 'enzyme';
import React from 'react';
import Navigation from '../component/Navigation/Navigation';

it('renders Navigation without crashing', () => {
    const initialProps = {
        onRouteChange: '', 
        isSignedIn: false
    }
    let  wrapper = shallow(<Navigation {...initialProps}/>);
    expect(wrapper).toMatchSnapshot();
});

it('route to signout', () => {    
    const initialProps2 = {
        onRouteChange: '', 
        isSignedIn: true
    }
    let wrapper2 = shallow(<Navigation {...initialProps2}/>);
    expect(wrapper2).toMatchSnapshot();
})
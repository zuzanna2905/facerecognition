import {shallow} from 'enzyme';
import React from 'react';
import SignIn from '../component/SignIn/SignIn';

it('renders SignIn without crashing', () => {
    let wrapper = shallow(<SignIn />);
    expect(wrapper).toMatchSnapshot();
});

it('simulate SignIn', () => {    
    const expectedState = {
        signInEmail: 'john@gmail.com',
        signInPassword: 'cookies'
    }
    let wrapper2 = shallow(<SignIn />);
    wrapper2.find('[id="password"]').simulate('change', {target: {value: 'cookies'}});
    wrapper2.find('[id="email-address"]').simulate('change', {target: {value: 'john@gmail.com'}});
    expect(wrapper2.state().password).toEqual(expectedState.password);
    expect(wrapper2.state().email).toEqual(expectedState.email);
    wrapper2.find('[id="signinsubmit"]').simulate('click');  
})
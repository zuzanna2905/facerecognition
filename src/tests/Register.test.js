import {shallow} from 'enzyme';
import React from 'react';
import Register from '../component/Register/Register';

it('renders Register without crashing', () => {
    let  wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
});

it('simulate Register', () => {    
    const expectedState = {
        email: 'john@gmail.com',
        password: 'cookies',
        name: 'John'
    }
    let wrapper2 = shallow(<Register />);
    wrapper2.find('[id="name"]').simulate('change', {target: {value: 'John'}});
    wrapper2.find('[id="password"]').simulate('change', {target: {value: 'cookies'}});
    wrapper2.find('[id="email-address"]').simulate('change', {target: {value: 'john@gmail.com'}});
    expect(wrapper2.state().name).toEqual(expectedState.name);
    expect(wrapper2.state().password).toEqual(expectedState.password);
    expect(wrapper2.state().email).toEqual(expectedState.email);
    wrapper2.find('[id="registersubmit"]').simulate('click');
})
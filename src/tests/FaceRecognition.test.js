import {shallow} from 'enzyme';
import React from 'react';
import FaceRecognition from '../component/FaceRecognition/FaceRecognition';

it('renders FaceRecognition without crashing', () => {
    const initialProps = {
        imageUrl: '',
        box : {
            topRow : 0,
            rightCol : 0,
            bottomRow : 0,
            leftCol: 0
        }
    }
    let wrapper = shallow(<FaceRecognition {...initialProps}/>);
    expect(wrapper).toMatchSnapshot();
});
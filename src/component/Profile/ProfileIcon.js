import React, { Component } from 'react';

class ProfileIcon extends Component {
    state = {
        dropdownOpen: false
    }
    render() {
        return (
            <div class='pa4 tc'>
                <img src="http://tachyons.io/img/logo.jpg" class="dib w2 h2 br-100" alt="Site Name"/>
            </div>
        );
    }
}

export default ProfileIcon;
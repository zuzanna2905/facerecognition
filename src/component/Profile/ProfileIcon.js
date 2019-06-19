import React, { Component } from 'react';
import { 
    ButtonDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem } 
from 'reactstrap';

class ProfileIcon extends Component {
    constructor (props) {
        super(props);        
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    render() {
        return (
            <div className='pa4 tc'>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <img src="http://tachyons.io/img/logo.jpg" className="dib w3 h3 br-100" alt="Site Name"/>
                    </DropdownToggle>
                    <DropdownMenu right className='b--transparent shadow-5'>
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={()=>this.props.onRouteChange('signout')}>Sign out</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}

export default ProfileIcon;
import React, { Component } from 'react';
import './header.scss'
import logo from '../../Monitor-Logo.png';

class Header extends Component {
    render() {
        return (
            <div className={'container'}>
                <img src={logo} className={'page-logo'} title={'Temperature monitoring logo'} alt={'Monitor-Logo'} />
            </div>
        )
    }
}

export default Header;
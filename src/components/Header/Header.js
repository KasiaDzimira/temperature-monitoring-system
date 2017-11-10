import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className={'top-menu'}>
                <div className={'menu'}>
                    <div className={'home'}><a href={'#'}>Home</a></div>
                    <div className={'about'}><a href={'#'}>About</a></div>
                    <div className={'contact'}><a href={'#'}>Contact</a></div>
                    <div className={'regulation'}><a href={'#'}>Regulation</a></div>
                </div>
            </div>
        )
    }
}

export default Header;
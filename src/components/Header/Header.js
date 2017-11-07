import React, { Component } from 'react';
import './header.scss'

class Header extends Component {
    render() {
        return (
            <div className={'top-menu'}>
                <div className={'left-menu'}> </div>
                <div className={'right-menu'}>
                    <div className={'home'}>Home</div>
                    <div className={'about'}>About</div>
                    <div className={'contact'}>Contact</div>
                </div>
            </div>
        )
    }
}

export default Header;
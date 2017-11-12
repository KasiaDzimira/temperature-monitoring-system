import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.css';

class Header extends Component {
    render() {
        return (
            <div className={'header'}>
                <div className={'top-menu'}>
                    <div className={'menu'}>
                        <div className={'home'}><Link to={'/'}>Home</Link></div>
                        <div className={'about'}><Link to={'/about'}>About</Link></div>
                        <div className={'contact'}><Link to={'/contact'}>Contact</Link></div>
                        <div className={'regulation'}><Link to={'/regulation'}>Regulation</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
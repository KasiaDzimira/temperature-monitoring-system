import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Login from '../Forms/Login'
import './homePage.css';

class HomePage extends Component {
    render() {
        return (
            <section className={'home-page-container'}>
                <div className={'home-page'}>
                    <div className={'login-user__text'}>
                        <span>Log in to your user panel:</span>
                    </div>
                    <Login />
                    <div className={'register-user'}>
                        <span>or create your account</span>
                        <Link to={'/register'}>
                            <button className={'register-button'}>Sign up</button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default HomePage;
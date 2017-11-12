import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Login from '../Forms/Login'
import './homePage.css';

class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className={'home-page'}>
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
            </section>
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            login: this.state.login,
            password: this.state.password
        };

        this.setState({
            login: '',
            password: ''
        });
    }
}

export default HomePage;
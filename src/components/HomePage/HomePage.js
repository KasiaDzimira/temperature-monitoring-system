import React, { Component } from 'react';
import './homePage.css'

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
            <section className={'login-user'}>
                <div className={'login-user-text'}>
                    <span>Log in to your user panel:</span>
                </div>
                <form className={'login-user__form'} onSubmit={this.handleSubmit}>
                    <input type={'text'} name={'login'} placeholder={'Username'} onChange={ this.handleChange } value={ this.state.login } />
                    <input type={'password'} name={'password'} placeholder={'Password'} onChange={ this.handleChange } value={ this.state.password } />
                    <button className={'login-button'}>Log in</button>
                </form>
                <div className={'register-user'}>
                    <span>or create your account</span>
                    <button className={'register-button'}>Sign out</button>
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
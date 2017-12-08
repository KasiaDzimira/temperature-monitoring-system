import React, { Component } from 'react'
import * as Server from '../../server'

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form className={'login-user__form'} onSubmit={this.handleSubmit}>
                <input type={'text'} name={'email'} placeholder={'Email'} onChange={ this.handleChange } value={ this.state.email } />
                <input type={'password'} name={'password'} placeholder={'Password'} onChange={ this.handleChange } value={ this.state.password } />
                <button className={'login-button'}>Log in</button>
            </form>
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = {
            email: this.state.email,
            password: this.state.password
        };

        Server.logIn(formData.email, formData.password);

        this.setState({
            email: '',
            password: ''
        });
    }
}

export default Login;
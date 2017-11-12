import React, { Component } from 'react'
import * as Server from '../../server'

class Login extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form className={'login-user__form'} onSubmit={this.handleSubmit}>
                <input type={'text'} name={'login'} placeholder={'Username'} onChange={ this.handleChange } value={ this.state.login } />
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

        let ref = 'users';
        const formData = {
            login: this.state.login,
            password: this.state.password
        };

        Server.fetchData(ref);
        var userFetcher = Server.getFetcher(ref);
        var user = userFetcher.findByUsername(formData.login);

        console.log(user);
        this.setState({
            login: '',
            password: ''
        });
    }
}

export default Login;
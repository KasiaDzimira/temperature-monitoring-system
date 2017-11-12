import React, { Component } from 'react';
import * as Server from '../../server';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: '',
            repeatedPassword: '',
            userRole: 'ROLE_USER'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className={'register-user'}>
                <div className={'register-user__text'}>
                    <span>Sign up</span>
                </div>
                <div className={'register-form'}>
                    <form className={'register-user__form'} onSubmit={this.handleSubmit}>
                        <input type={'text'} name={'login'} placeholder={'Username'} onChange={ this.handleChange } value={ this.state.login } />
                        <input type={'password'} name={'password'} placeholder={'Password'} onChange={ this.handleChange } value={ this.state.password } />
                        <input type={'password'} name={'repeatedPassword'} placeholder={'Repeat password'} onChange={ this.handleChange } value={ this.state.repeatedPassword } />
                        <button className={'btn__create-account'}>Create account</button>
                    </form>
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
            id: this.state.login, //This value is custom id for  Firebase. Login is unique value for users
            login: this.state.login,
            password: this.state.password,
            repeatedPassword: this.state.repeatedPassword,
            userRole: this.state.userRole
        };

        Server.pushData('users', user);

        this.setState({
            login: '',
            password: '',
            repeatedPassword: ''
        });
    }
}

export default Register;


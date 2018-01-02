import React, { Component } from 'react'
import * as Server from '../../server'

class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            phone: '',
            password: '',
            repeatedPassword: '',
            userRole: 'ROLE_USER',
            sensors: null
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
                        <input type={'text'} name={'email'} placeholder={'Email'} onChange={ this.handleChange } value={ this.state.email } />
                        <input type={'text'} name={'phone'} placeholder={'Phone'} onChange={ this.handleChange } value={ this.state.phone } />
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
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            repeatedPassword: this.state.repeatedPassword,
            userRole: this.state.userRole,
            sensors: this.state.sensors
        };

        if (this.isValidPassword(user)) {
            Server.createUser(user);
        }

        this.setState({
            email: '',
            phone: '',
            password: '',
            repeatedPassword: ''
        });
    }

    isValidPassword(user) {
        if (user.password === user.repeatedPassword) {
            return true;
        }

        console.log('Passwords must be this same');

        return false;
    }
}

export default Register;


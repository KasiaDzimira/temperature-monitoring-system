import React, { Component } from 'react';
import pushData from '../../server';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: '',
            userRole: 'ROLE_USER'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <section className={'register-user'}>
                <form className={'register-user__form'} onSubmit={this.handleSubmit}>
                    <input type={'text'} name={'login'} placeholder={'Username'} onChange={ this.handleChange } value={ this.state.login } />
                    <input type={'password'} name={'password'} placeholder={'Password'} onChange={ this.handleChange } value={ this.state.password } />
                    <button>Create account</button>
                </form>
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
            password: this.state.password,
            userRole: this.state.userRole
        };

        pushData('users', user);

        this.setState({
            login: '',
            password: ''
        });
    }
}

export default Register;


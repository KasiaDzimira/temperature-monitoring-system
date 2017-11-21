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

        // let ref = 'users';
        // this.checkIfIsAdmin(ref, formData.email);

        Server.logIn(formData.email, formData.password);

        this.setState({
            email: '',
            password: ''
        });
    }

    // checkIfIsAdmin(ref, email) {
    //     var promise = Server.fetchData(ref);
    //
    //     let userFetcher = Server.getFetcher(ref);
    //     let user = userFetcher.findByUsername(email);
    //
    //     if (user) {
    //         console.log('is admin');
    //     } else {
    //         console.log('isn\'t admin');
    //     }
    // }
}

export default Login;
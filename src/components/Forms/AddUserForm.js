import React, { Component } from 'react'
import * as Server from '../../server'
import { CylinderSpinLoader } from 'react-css-loaders'
import Select from 'react-select'
import { Link } from 'react-router-dom';

class AddSensorForm extends Component {
    constructor() {
        super();

        this.handleUserRole = this.handleUserRole.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            userRole: '',
            email: '',
            password: ''
        }
    }

    renderUserRolesSelect(selectedValue) {
        let items = [
            { value: 'ROLE_USER', label: 'ROLE_USER' },
            { value: 'ROLE_ADMIN', label: 'ROLE_ADMIN' }
        ];

        return (
            <Select
                name={ 'user-roles' }
                options={items}
                value={ selectedValue }
                className={ 'user-roles__select' }
                placeholder={ 'Select user role' }
                onChange={ (e) => this.handleUserRole(e) }
            />
        )
    }

    handleEmailChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUserRole(data) {
        this.setState({
            userRole: data ? data.value : ''
        })
    }

    handlePasswordChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            userRole: this.state.userRole,
            sensors: null
        };

        Server.createUser(user);

        this.setState({
            email: '',
            password: '',
            userRole: ''
        });

        this.props.unmount();
    }

    render() {
        return (
            <form className={'add-user__form'} onSubmit={ this.handleFormSubmit }>
                <input className={'email-input'} type={'text'} name={'email'} placeholder={'E-mail'} onChange={ this.handleEmailChange } value={ this.state.email } />
                <input className={'password-input'} type={'password'} name={'password'} placeholder={'Password'} onChange={ this.handlePasswordChange } value={ this.state.password } />
                { this.renderUserRolesSelect(this.state.userRole) }
                <button className={'btn__confirm'}><Link to={'/admin-profile/users-manager'}>Confirm</Link></button>
            </form>
        )
    }
}

export default AddSensorForm;
import React, { Component } from 'react'
import * as Server from '../../server'
import Select from 'react-select'
import { Link } from 'react-router-dom';

class EditSensorForm extends Component {
    constructor() {
        super();

        this.handleUserRole = this.handleUserRole.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            userRole: '',
            phone: ''
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUserRole(data) {
        this.setState({
            userRole: data ? data.value : ''
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();

        Server.updateUser(this.props.userId, {role: this.state.userRole ? this.state.userRole : this.props.role, phone: this.state.phone ? this.state.phone : this.props.phone});

        this.setState({
            userRole: '',
            phone: ''
        });

        this.props.unmount();
    }

    render() {
        return (
            <form className={'add-user__form'} onSubmit={ this.handleFormSubmit }>
                { this.renderUserRolesSelect(this.state.userRole ? this.state.userRole : this.props.role) }
                <input type={'text'} name={'phone'} placeholder={'Phone'} onChange={ this.handleChange } value={ this.state.phone ? this.state.phone : this.props.phone } />
                <button className={'btn__confirm'}><Link to={'/admin-profile/users-manager'}>Confirm</Link></button>
            </form>
        )
    }
}

export default EditSensorForm;
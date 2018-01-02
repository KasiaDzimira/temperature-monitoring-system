import React, { Component } from 'react'
import * as Server from '../../server'
import Select from 'react-select'
import { Link } from 'react-router-dom';

class AddAlertForm extends Component {
    constructor() {
        super();

        this.handleAlertType = this.handleAlertType.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);

        this.state = {
            type: '',
            content: ''
        }
    }

    renderTypesSelect(selectedValue) {
        let items = [
            { value: 'INFO', label: 'INFO' },
            { value: 'WARNING', label: 'WARNING' },
            { value: 'DANGER', label: 'DANGER' },
            { value: 'ERROR', label: 'ERROR' }
        ];

        return (
            <Select
                name={ 'alert-types' }
                options={items}
                value={ selectedValue }
                className={ 'alert-types__select' }
                placeholder={ 'Select alert type' }
                onChange={ (e) => this.handleAlertType(e) }
            />
        )
    }

    handleContentChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAlertType(data) {
        this.setState({
            type: data ? data.value : ''
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const alert = {
            type: this.state.type,
            content: this.state.content,
            sensorType: 'TEMPERATURE'
        };

        Server.pushData('alerts', alert);

        this.setState({
            type: '',
            content: '',
        });

        this.props.unmount();
    }

    render() {
        return (
            <form className={'add-alert__form'} onSubmit={ this.handleFormSubmit }>
                <div className={'alert-type__label'}>Select alert type:</div>
                { this.renderTypesSelect(this.state.type) }
                <div className={'alert-message__label'}>Alert message:</div>
                <textarea className={'content-input'} rows={10} cols={50} name={'content'} onChange={ this.handleContentChange } value={ this.state.content } placeholder={'Alert message'}></textarea>
                <button className={'btn__confirm'}><Link to={'/admin-profile/alerts-manager'}>Create</Link></button>
            </form>
        )
    }
}

export default AddAlertForm;
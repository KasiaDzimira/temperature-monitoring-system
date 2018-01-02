import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ContactPage extends Component {
    constructor() {
        super();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);

        this.state = {
            email: '',
            content: ''
        }
    }

    handleEmailChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleContentChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        console.log('Message send');

        this.setState({
            email: '',
            content: ''
        });
    }

    render() {
        return (
            <section className={'contact-page'}>
                <h1>Contact us</h1>
                <form className={'send-message__form'} onSubmit={ this.handleFormSubmit }>
                    <div className={'email-input__label'}>E-mail address:</div>
                    <input className={'email-input'} type={'text'} name={'email'} placeholder={'E-mail'} onChange={ this.handleEmailChange } value={ this.state.email } />
                    <div className={'content-area__label'}>Message:</div>
                    <textarea className={'content-input'} rows={10} cols={50} name={'content'} onChange={ this.handleContentChange } value={ this.state.content } placeholder={'Your message'}></textarea>
                    <button className={'btn__confirm'}><Link to={'/contact'}>Send</Link></button>
                </form>
            </section>
        )
    }
}

export default ContactPage;
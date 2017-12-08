import React, { Component } from 'react'
import * as Server from '../../server'

class LogoutButton extends Component {
    render() {
        return (
            <section className="log-out__section">
                <div className={'log-out'}>
                    <button className={'log-out__btn'} onClick={ this.logOutUser }>Log out</button>
                </div>
            </section>
        )
    }

    logOutUser(e) {
        e.preventDefault();

        Server.logOut();
    }
}

export default LogoutButton;
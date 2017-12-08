import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    constructor() {
        super();

        this.handleUserSensors = this.handleUserSensors.bind(this);
        this.handleAlerts = this.handleAlerts.bind(this);
        this.handleUsersManagement = this.handleUsersManagement.bind(this);

        this.state = {
            userSensors: '',
            alerts: '',
            usersManagement: ''
        }
    }

    handleUserSensors(e) {
        e.preventDefault();

        this.setState({
            userSensors: 'selected',
            alerts: '',
            usersManagement: ''
        })
    }

    handleAlerts(e) {
        e.preventDefault();

        this.setState({
            userSensors: '',
            alerts: 'selected',
            usersManagement: ''
        })
    }

    handleUsersManagement(e) {
        e.preventDefault();

        this.setState({
            userSensors: '',
            alerts: '',
            usersManagement: 'selected'
        })
    }

    render() {
        return(
            <section className={'top-menu__section'}>
                <div className={'top-menu'}>
                    <div className={'user-sensors ' + this.state.userSensors} onClick={ this.handleUserSensors }>
                        <span><Link to={'/admin-profile/user-sensors'}>User sensors</Link></span>
                    </div>
                    <div className={'alerts ' + this.state.alerts} onClick={ this.handleAlerts }>
                        <span>Alerts</span>
                    </div>
                    <div className={'users-management ' + this.state.usersManagement} onClick={ this.handleUsersManagement }>
                        <span><Link to={'/admin-profile/users-manager'}>Users management</Link></span>
                    </div>
                </div>
            </section>
        )
    }
}

export default Menu;
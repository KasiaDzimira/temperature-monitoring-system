import React, { Component } from 'react'
import * as Server from '../../server'
import SensorView from '../Sensor/SensorView'

class MainPage extends Component {
    render() {
        return (
            <section className={'profile'}>
                <SensorView />
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

export default MainPage;
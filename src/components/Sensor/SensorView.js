import React, { Component } from 'react'
import * as Server from '../../server'

class SensorView extends Component {
    render() {
        this.userHasSensors();

        return (
            <section className={'sensor'}>
                <div className={'not-found'}></div>
            </section>
        )
    }

    userHasSensors() {
        Server.fetchData('users');

        var userFetcher = Server.getFetcher('users');

        var loggedUser = userFetcher.findByUsername(window.localStorage.getItem('loggedUser'));
    }
}

export default SensorView;
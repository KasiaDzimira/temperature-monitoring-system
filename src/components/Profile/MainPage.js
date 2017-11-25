import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import SensorDropdown from '../Dropdowns/sensor-dropdown'
import { CylinderSpinLoader } from 'react-css-loaders'

var sensors = undefined;

class MainPage extends Component {
    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseUsersData(newData);
        }, 'users');

        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseSensorsData(newData);
        }, 'sensors');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sensors !== this.props.sensors && prevProps.sensors) {
            sensors = prevProps.sensors;
        }
    }

    selectSensor(val) {
        Server.addSensorToUser(val, window.localStorage.getItem('loggedUser'));
    }

    render() {
        if (!this.props.sensors && !sensors) {
            return <CylinderSpinLoader />
        }

        if (this.props.sensors) {
            sensors = this.props.sensors;
        }

        return (
            <section className={'profile'}>
                <div className={'login'}>You are logged as { window.localStorage.getItem('loggedUser') }</div>
                <div className={'select-sensor__info'}>Select your first sensor:</div>
                <SensorDropdown sensors={sensors} callback={ this.selectSensor.bind(this) }/>
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

MainPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.profile.users,
        sensors: state.profile.sensors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

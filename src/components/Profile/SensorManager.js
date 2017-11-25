import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import DeleteIcon from 'react-icons/lib/ti/minus'
import AddIcon from 'react-icons/lib/ti/plus'
import EditAction from 'react-icons/lib/ti/edit'
import { CylinderSpinLoader } from 'react-css-loaders'
import SensorDropdown from '../Dropdowns/sensor-dropdown'

var userSensors = {};
var allSensors = {};
var selectVisible = false;

class SensorManager extends Component {
    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseSensorsData(newData);
        }, 'sensors');

        Server.getObjectById((newData) => {
            this.props.actions.receivedFirebaseUserSensorsData(newData);
        }, 'users', this.props.match.params.userId);
    }

    renderListOfSensors() {
        if (userSensors === 0) {
            return (
                <div className={'empty-list-item'}>
                    <div className={'empty-item'}>User doesn't have any sensors.</div>
                </div>
            )
        }

        return (
            Object.keys(userSensors).map(key => {
                return (
                    <div className={'list-item'}>
                        <div className={'sensor-id'}>
                            { key }
                        </div>
                        <div className={'sensor-type'}>Temperature</div>
                        <div className={'sensor-actions'}>
                            <div className={'delete-sensor'} onClick={ this.handleDeleteSensorButton.bind(this) }><DeleteIcon /></div>
                            <div className={'edit-sensor'}><EditAction /></div>
                        </div>
                    </div>
                )
            })
        )
    }

    handleDeleteSensorButton() {
        console.log('remove me')
    }

    handleAddSensorButton() {
        selectVisible = !selectVisible;

        this.forceUpdate();
    }

    selectSensor(val) {
        selectVisible = false;
        Server.addSensorToUser(val, this.props.match.params.userId);
    }

    render() {
        if (this.props.userSensors || this.props.userSensors === 0) {
            userSensors = this.props.userSensors;
        }

        if(this.props.sensors) {
            allSensors = this.props.sensors
        }

        if (userSensors || userSensors === 0) {
            return (
                <section className={'sensor-manager'}>
                    <div className={'users-list'}>List of sensors:</div>
                    <div className={'list'}>
                        <div className={'list-header'}>
                            <div className={'sensor-id'}>Sensor id</div>
                            <div className={'sensor-type'}>Type</div>
                            <div className={'sensor-actions__label'}>Actions</div>
                        </div>
                        { this.renderListOfSensors() }
                    </div>
                    <div className={'add-sensor'} onClick={ this.handleAddSensorButton.bind(this) }>
                        Add sensor <AddIcon />
                    </div>
                    <SensorDropdown className={selectVisible ? 'sensor-select visible' : 'sensor-select hidden'} sensors={allSensors} callback={ this.selectSensor.bind(this) }/>
                </section>
            )
        } else {
            return <CylinderSpinLoader />
        }
    }
}

SensorManager.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userSensors: state.profile.userSensors,
        sensors: state.profile.sensors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorManager);
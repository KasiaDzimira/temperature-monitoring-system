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
import AddSensorForm from '../Forms/AddSensorForm'

var userSensors = {};

class SensorManager extends Component {
    constructor() {
        super();

        this.state = {
            addSensorFormVisible: false
        }
    }

    componentDidMount() {
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
                        <div className={'sensor-type'}>{ userSensors[key].type }</div>
                        <div className={'sensor-place'}>{ userSensors[key].place }</div>
                        <div className={'sensor-actions'}>
                            <div className={'delete-sensor'} onClick={ this.handleDeleteSensorButton.bind(this, key) }><DeleteIcon /></div>
                            <div className={'edit-sensor'}><EditAction /></div>
                        </div>
                    </div>
                )
            })
        )
    }

    handleDeleteSensorButton(sensorId) {
        Server.removeUserSensor(sensorId, this.props.match.params.userId);
    }

    handleAddSensorButton() {
        this.setState({
            addSensorFormVisible: !this.state.addSensorFormVisible
        });

        this.forceUpdate();
    }

    handleAddSensorFormUnmount() {
        this.setState({
            addSensorFormVisible: false
        })
    }

    render() {
        if (this.props.userSensors || this.props.userSensors === 0) {
            userSensors = this.props.userSensors;
        }

        if (userSensors || userSensors === 0) {
            return (
                <section className={'sensor-manager'}>
                    <div className={'users-list'}>List of sensors:</div>
                    <div className={'list'}>
                        <div className={'list-header'}>
                            <div className={'sensor-id'}>Sensor id</div>
                            <div className={'sensor-type'}>Type</div>
                            <div className={'sensor-type'}>Place</div>
                            <div className={'sensor-actions__label'}>Actions</div>
                        </div>
                        { this.renderListOfSensors() }
                    </div>
                    <div className={'add-sensor'} onClick={ this.handleAddSensorButton.bind(this) }>
                        Add sensor <AddIcon />
                    </div>
                    { this.state.addSensorFormVisible ? <AddSensorForm userId={ this.props.match.params.userId } unmount={ this.handleAddSensorFormUnmount.bind(this) }/> : null }
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorManager);
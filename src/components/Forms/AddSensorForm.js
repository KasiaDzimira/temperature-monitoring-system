import React, { Component } from 'react'
import SensorDropdown from '../Dropdowns/sensor-dropdown'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import Select from 'react-select'
import { Link } from 'react-router-dom';

class AddSensorForm extends Component {
    constructor() {
        super();

        this.handleSensor = this.handleSensor.bind(this);
        this.handleSensorType = this.handleSensorType.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            selectedSensor: '',
            selectedSensorType: '',
            place: ''
        }
    }

    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseSensorsData(newData);
        }, 'sensors');
    }

    renderSensorTypesSelect(selectedValue) {
        let items = [
            { value: 'temperature', label: 'temperature' },
            { value: 'pressure', label: 'pressure' },
            { value: 'wetness', label: 'wetness' }
        ];

        return (
            <Select
                name={ 'sensor-types' }
                options={items}
                value={ selectedValue }
                className={ 'sensor-types__select' }
                placeholder={ 'Select sensor type' }
                onChange={ (e) => this.handleSensorType(e) }
            />
        )
    }

    handleSensor(data) {
        this.setState({
            selectedSensor: data ? data.value : ''
        })
    }

    handleSensorType(data) {
        this.setState({
            selectedSensorType: data ? data.value : ''
        })
    }

    handlePlaceChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const sensor = {
            type: this.state.selectedSensorType,
            place: this.state.place
        };

        Server.addSensorToUser(this.state.selectedSensor, sensor, this.props.userId);

        this.setState({
            selectedSensor: '',
            selectedSensorType: '',
            place: ''
        });

        this.props.unmount();
    }

    render() {
        if (!this.props.sensors) {
            return <CylinderSpinLoader />
        }

        return (
            <form className={'add-sensor__form'} onSubmit={ this.handleFormSubmit }>
                <SensorDropdown sensors={ this.props.sensors } selectedValue={ this.state.selectedSensor } callback={ this.handleSensor } />
                { this.renderSensorTypesSelect(this.state.selectedSensorType) }
                <input className={'place-input'} type={'text'} name={'place'} placeholder={'Place'} onChange={ this.handlePlaceChange } value={ this.state.place } />
                <button className={'btn__confirm'}><Link to={`/sensor-manager/${this.props.userId}`}>Confirm</Link></button>
            </form>
        )
    }
}

AddSensorForm.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        sensors: state.profile.sensors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSensorForm);
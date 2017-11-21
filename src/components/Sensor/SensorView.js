import React, { Component } from 'react'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import PropTypes from 'prop-types'
import Loader from '../Loader/loader'
import ReactSelect from "react-select"

class SensorView extends Component {
    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseData(newData);
        }, 'sensors')
    }

    getSensors(email, users) {
        for (var user in users) {
            if (users[user].email === email) {
                return users[user].sensors;
            }
        }
    }

    render() {
        let sensors = this.props.firebaseData;

        console.log(sensors);

        if (this.props.hasSensor) {
            return (
                <section className={'sensor'}>
                    <div className={'not-found'}>Sensors has been found!</div>
                </section>
            )
        } else {
            return (
                <section className={'sensor'}>
                    <div className={'not-found'}>User has not any sensors!</div>
                </section>
            )
        }
    }
}

SensorView.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        firebaseData: state.profile.firebaseData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorView);
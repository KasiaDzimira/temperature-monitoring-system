import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import LogoutButton from '../Buttons/LogoutButton'
import SimpleLineChart from '../Charts/SimpleLineChart'
import DatePicker from 'react-datepicker'
import moment from 'moment'

var userSensors = {};

class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Server.getObjectById((newData) => {
            this.props.actions.receivedFirebaseUserSensorsData(newData);
        }, 'users', this.props.match.params.userId);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        if (this.props.userSensors) {
            userSensors = this.props.userSensors;
        }

        if (!userSensors || Object.keys(userSensors).length === 0) {
            return (
                <section className={'profile'}>
                    <div className={'login'}>You are logged as { window.localStorage.getItem('loggedUser') }</div>
                    <div className={'select-sensor__info'}>You don't have any registered sensors.</div>
                    <LogoutButton />
                </section>
            )
        }

        if (!this.props.userSensors && this.props.userSensors !== 0 && !userSensors) {
            return <CylinderSpinLoader />
        }

        return (
            <section className={'profile'}>
                <LogoutButton />
                <div className={'date-picker'}>
                    <div className={'date-picker__info'}>
                        Select date:
                    </div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        dateFormat={'YYYY-MM-DD'}
                    />
                </div>
                <div className={'charts'}>
                <SimpleLineChart userSensors={userSensors} date={this.state.startDate}/>
                </div>
            </section>
        );
    }
}

MainPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

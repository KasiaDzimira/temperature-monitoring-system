import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import { Link } from 'react-router-dom';

let users = {};

class UserSensorsView extends Component {
    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseUsersData(newData);
        }, 'users');
    }

    renderListOfUsers() {
        return (
            <div className={'list'}>
                <div className={'list-header'}>
                    <div className={'email-label'}>User e-mail</div>
                    <div className={'sensors-label'}>Number of sensors</div>
                </div>
                { Object.keys(users).map(key => {
                    return (
                        <Link to={`/admin-profile/sensor-manager/${key}`}>
                            <div className={'list-item'}>
                                <div className={'user-email'}>
                                    { users[key].email }
                                </div>
                                <div className={'user-sensors'}>
                                    { this.getNumberOfSensors(users[key].sensors) }
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

    getNumberOfSensors(sensors) {
        if (sensors) {
            return Object.keys(sensors).length
        } else {
            return 0
        }
    }

    render() {
        if (!this.props.users) {
            return <CylinderSpinLoader />
        }

        users = this.props.users;

        return (
            <section className={'profile'}>
                <div className={'users-list'}>List of users:</div>
                { this.renderListOfUsers() }
            </section>
        )
    }
}

UserSensorsView.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        users: state.profile.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSensorsView);
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import SensorView from '../Sensor/SensorView'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'

class MainPage extends Component {
    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseData(newData);
        }, 'users')
    }

    hasSensors(email) {
        let users = this.props.firebaseData;

        if (users) {
            for (var user in users) {
                if (users[user].email === email && users[user].sensors) {
                    return true;
                }
            }
        }
    }

    render() {
        return (
            <section className={'profile'}>
                <SensorView hasSensor={this.hasSensors(window.localStorage.getItem('loggedUser'))} />
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
        firebaseData: state.profile.firebaseData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

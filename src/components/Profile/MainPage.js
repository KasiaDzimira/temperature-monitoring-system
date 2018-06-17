import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import LogoutButton from '../Buttons/LogoutButton'
import SimpleLineChart from '../Charts/SimpleLineChart'
import Pagination from "react-js-pagination"
require("bootstrap/dist/css/bootstrap-theme.css");
require("bootstrap/dist/css/bootstrap.css");

var userSensors = {};

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        Server.getObjectById((newData) => {
            this.props.actions.receivedFirebaseUserSensorsData(newData);
        }, 'users', this.props.match.params.userId);

        // Server.getAllSensorsData((newData) => {
        //     this.props.actions.receivedFirebaseSensorsData(newData);
        // });
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    render() {
        if (this.props.userSensors) {
            userSensors = this.props.userSensors;
        }

        // Server.getAllSensorsData();

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
                <div className={'charts'}>
                <SimpleLineChart userSensors={userSensors} />
                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={30}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
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
        // sensors: state.profile.sensors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

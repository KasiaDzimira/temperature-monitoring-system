import React, { Component } from 'react'
import * as Server from "../../server";
import {bindActionCreators} from "redux";
import * as ProfileActions from "../../actions/profile-actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { CylinderSpinLoader } from 'react-css-loaders'
import DeleteIcon from 'react-icons/lib/ti/minus'
import AddIcon from 'react-icons/lib/ti/plus'
import EditIcon from 'react-icons/lib/ti/edit'
import AddAlertForm from '../Forms/AddAlertForm'
import EditAlertForm from '../Forms/EditAlertForm'

var alerts = {};

class AlertsManagerView extends Component {

    constructor() {
        super();

        this.state = {
            addAlertFormVisible: false,
            editAlertFormVisible: false,
            alertId: ''
        }
    }

    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseData(newData);
        }, 'alerts');
    }

    renderListOfAlerts() {
        return (
            <div className={'list'}>
                { Object.keys(alerts).map(key => {
                    return (
                        <div className={'list-item'}>
                            <div className={'alert-type'}>
                                { alerts[key].type }
                            </div>
                            <div className={'alert-content'}>
                                { alerts[key].content }
                            </div>
                            <div className={'actions'}>
                                <div className={'delete-alert'} onClick={ this.handleDeleteAlertBtnClick.bind(this, key) }><DeleteIcon /></div>
                                <div className={'edit-alert'} onClick={ this.handleEditAlertBtnClick.bind(this, key) }><EditIcon /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    handleAddAlertButton() {
        this.setState({
            addAlertFormVisible: !this.state.addAlertFormVisible
        });

        this.forceUpdate();
    }

    handleDeleteAlertBtnClick(alertId) {
        Server.remove('alerts', alertId)
    }

    handleEditAlertBtnClick(alertId) {
        this.setState({
            editAlertFormVisible: !this.state.editAlertFormVisible,
            alertId: alertId
        });

        this.forceUpdate();
    }

    handleAddAlertFormUnmount() {
        this.setState({
            addAlertFormVisible: false
        })
    }

    handleEditAlertFormUnmount() {
        this.setState({
            editAlertFormVisible: false
        })
    }

    render() {
        if (!this.props.data) {
            return (
                <section className={'alerts-manager'}>
                    <h1>Temperature alerts</h1>
                    <div className={'alerts-container'}>
                        <div className={'list'}>
                            <div className={'list-header'}>
                                <div className={'alert-type'}>Type</div>
                                <div className={'alert-content'}>Message</div>
                                <div className={'alert-actions__label'}>Actions</div>
                            </div>
                            <div className={'empty-list-item'}>
                                <div className={'empty-item'}>No alerts found</div>
                            </div>
                        </div>
                        <div className={'add-alert'} onClick={ this.handleAddAlertButton.bind(this) }>
                            Add alert <AddIcon />
                        </div>
                        { this.state.addAlertFormVisible ? <AddAlertForm unmount={ this.handleAddAlertFormUnmount.bind(this) }/> : null }
                    </div>
                </section>
            )
        }

        alerts = this.props.data;

        return (
            <section className={'alerts-manager'}>
                <h1>Temperature alerts</h1>
                <div className={'alerts-container'}>
                    <div className={'alerts-list'}>List of alerts:</div>
                    <div className={'list'}>
                        <div className={'list-header'}>
                            <div className={'alert-type'}>Type</div>
                            <div className={'alert-content'}>Message</div>
                            <div className={'alert-actions__label'}>Actions</div>
                        </div>
                        { this.renderListOfAlerts() }
                    </div>
                    <div className={'add-alert'} onClick={ this.handleAddAlertButton.bind(this) }>
                        Add alert <AddIcon />
                    </div>
                    { this.state.addAlertFormVisible ? <AddAlertForm unmount={ this.handleAddAlertFormUnmount.bind(this) }/> : null }
                    { this.state.editAlertFormVisible ? <EditAlertForm alertId={ this.state.alertId } type={ alerts[this.state.alertId].type } content={ alerts[this.state.alertId].content } unmount={ this.handleEditAlertFormUnmount.bind(this) }/> : null }
                </div>
            </section>
        )
    }
}

AlertsManagerView.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.profile.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsManagerView);
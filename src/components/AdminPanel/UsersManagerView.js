import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Server from '../../server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProfileActions from '../../actions/profile-actions'
import { CylinderSpinLoader } from 'react-css-loaders'
import DeleteIcon from 'react-icons/lib/ti/minus'
import AddIcon from 'react-icons/lib/ti/plus'
import EditIcon from 'react-icons/lib/ti/edit'
import AddUserForm from '../Forms/AddUserForm'
import EditUserForm from '../Forms/EditUserForm'

let users = {};

class UsersManagementView extends Component {
    constructor() {
        super();

        this.state = {
            addUserFormVisible: false,
            editUserFormVisible: false,
            userId: ''
        }
    }

    componentDidMount() {
        Server.setOnUpdateCallback((newData) => {
            this.props.actions.receivedFirebaseData(newData);
        }, 'users');
    }

    renderListOfUsers() {
        return (
            <div className={'list'}>
                <div className={'list-header'}>
                    <div className={'email-label'}>User e-mail</div>
                    <div className={'role-label'}>Role</div>
                    <div className={'phone-label'}>Phone</div>
                    <div className={'actions'}>Actions</div>
                </div>
                { Object.keys(users).map(key => {
                    return (
                        <div className={'list-item'}>
                            <div className={'user-email'}>
                                { users[key].email }
                            </div>
                            <div className={'user-role'}>
                                { users[key].role }
                            </div>
                            <div className={'user-phone'}>
                                { users[key].phone }
                            </div>
                            <div className={'actions'}>
                                <div className={'delete-user'} onClick={ this.handleDeleteUserBtnClick.bind(this, key) }><DeleteIcon /></div>
                                <div className={'edit-user'} onClick={ this.handleEditUserBtnClick.bind(this, key) }><EditIcon /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    handleDeleteUserBtnClick(userId) {
        Server.remove('users', userId);
    }

    handleEditUserBtnClick(userId) {
        this.setState({
            editUserFormVisible: !this.state.editUserFormVisible,
            userId: userId
        });

        this.forceUpdate();
    }

    handleAddUserBtnClick() {
        this.setState({
            addUserFormVisible: !this.state.addUserFormVisible
        });

        this.forceUpdate();
    }

    handleAddUserFormUnmount() {
        this.setState({
            addUserFormVisible: false
        })
    }

    handleEditUserFormUnmount() {
        this.setState({
            editUserFormVisible: false
        })
    }

    render() {
        if (!this.props.data) {
            return <CylinderSpinLoader />
        }

        users = this.props.data;

        return (
            <section className={'profile user-management__section'}>
                <div className={'user-management'}>
                    { this.renderListOfUsers() }
                    <div className={'add-user'} onClick={ this.handleAddUserBtnClick.bind(this) }>
                        Add user <AddIcon />
                    </div>
                    { this.state.addUserFormVisible ? <AddUserForm unmount={ this.handleAddUserFormUnmount.bind(this) }/> : null }
                    { this.state.editUserFormVisible ?
                        <EditUserForm
                            userId={ this.state.userId }
                            role={ users[this.state.userId].role }
                            phone={ users[this.state.userId].phone }
                            unmount={ this.handleEditUserFormUnmount.bind(this) }
                        /> : null
                    }
                </div>
            </section>
        )
    }
}

UsersManagementView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagementView);
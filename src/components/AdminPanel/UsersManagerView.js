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

let users = {};

class UsersManagementView extends Component {
    constructor() {
        super();

        this.state = {
            addUserFormVisible: false
        }
    }

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
                    <div className={'actions'}>Actions</div>
                </div>
                { Object.keys(users).map(key => {
                    return (
                        <div className={'list-item'}>
                            <div className={'user-email'}>
                                { users[key].email }
                            </div>
                            <div className={'actions'}>
                                <div className={'delete-user'} onClick={ this.handleDeleteUserBtnClick.bind(this, key) }><DeleteIcon /></div>
                                <div className={'edit-user'}><EditIcon /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    handleDeleteUserBtnClick(userId) {
        Server.removeUser(userId);
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

    render() {
        if (!this.props.users) {
            return <CylinderSpinLoader />
        }

        users = this.props.users;

        return (
            <section className={'profile user-management__section'}>
                <div className={'user-management'}>
                    { this.renderListOfUsers() }
                    <div className={'add-user'} onClick={ this.handleAddUserBtnClick.bind(this) }>
                        Add user <AddIcon />
                    </div>
                    { this.state.addUserFormVisible ? <AddUserForm unmount={ this.handleAddUserFormUnmount.bind(this) }/> : null }
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
        users: state.profile.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagementView);
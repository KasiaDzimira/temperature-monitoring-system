import React from 'react'
import Menu from '../Header/Menu'
import MainAdmin from '../MainAdmin'
import LogoutButton from '../Buttons/LogoutButton'

const AdminViewsWrapper = () => (
    <div className={'admin-panel'}>
        <Menu />
        <MainAdmin />
        <LogoutButton />
    </div>
);

export default AdminViewsWrapper;
import React from 'react'
import Menu from '../Header/Menu'
import MainAdmin from '../MainAdmin'
import LogoutButton from '../Buttons/LogoutButton'

const AdminViewsWrapper = () => (
    <div className={'admin-panel'}>
        <Menu />
        <LogoutButton />
        <MainAdmin />
    </div>
);

export default AdminViewsWrapper;
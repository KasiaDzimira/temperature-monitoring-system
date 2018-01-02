import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserSensors from './AdminPanel/UserSensorsView'
import SensorManager from './AdminPanel/SensorManager'
import UsersManager from './AdminPanel/UsersManagerView'
import AlertsManager from './AdminPanel/AlertsManagerView'

const MainAdmin = () => (
    <Switch>
        <Route exact path={'/admin-profile/user-sensors'} component={ UserSensors } />
        <Route path={'/admin-profile/sensor-manager/:userId'} component={ SensorManager } />
        <Route path={'/admin-profile/users-manager'} component={ UsersManager } />
        <Route path={'/admin-profile/alerts-manager'} component={ AlertsManager } />
    </Switch>
);

export default MainAdmin;
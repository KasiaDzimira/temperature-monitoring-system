import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Register from './Forms/Register'
import MainPage from './Profile/MainPage'
import AdminPage from './Profile/AdminProfile'
import SensorManager from './Profile/SensorManager'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route path="/register" component={ Register } />
            <Route path={'/profile'} component={ MainPage } />
            <Route path={'/admin-profile'} component={ AdminPage } />
            <Route path={'/sensor-manager/:userId'} component={ SensorManager }/>
        </Switch>
    </main>
);

export default Main;
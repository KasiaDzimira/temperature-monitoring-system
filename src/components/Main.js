import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Register from './Forms/Register'
import MainPage from './Profile/MainPage'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route path="/register" component={ Register } />
            <Route path={'/profile'} component={ MainPage } />
        </Switch>
    </main>
);

export default Main;
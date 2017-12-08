import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Register from './Forms/Register'
import MainPage from './Profile/MainPage'
import AdminPage from './Wrappers/AdminViewsWrapper'
import AboutPage from './StaticPages/AboutPage'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route path={'/about'} component={ AboutPage }/>
            <Route path="/register" component={ Register } />
            <Route path={'/profile/:userId'} component={ MainPage } />
            <Route path={'/admin-profile'} component={ AdminPage } />
        </Switch>
    </main>
);

export default Main;
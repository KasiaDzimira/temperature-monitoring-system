import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Register from './Forms/Register'
import MainPage from './Profile/MainPage'
import AdminPage from './Wrappers/AdminViewsWrapper'
import AboutPage from './StaticPages/AboutPage'
import ContactPage from './StaticPages/ContactPage'
import RegulationPage from './StaticPages/RegulationPage'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route path={'/about'} component={ AboutPage }/>
            <Route path={'/contact'} component={ ContactPage }/>
            <Route path={'/regulation'} component={ RegulationPage }/>
            <Route path="/register" component={ Register } />
            <Route path={'/profile/:userId'} component={ MainPage } />
            <Route path={'/admin-profile'} component={ AdminPage } />
        </Switch>
    </main>
);

export default Main;
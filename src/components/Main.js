import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Register from './Forms/Register'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route path="/register" component={ Register } />
        </Switch>
    </main>
);

export default Main;
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-browser-router'
import './styles/index.css'
import registerServiceWorker from './registerServiceWorker'
import LayoutWrapper from './components/Wrappers/LayoutWrapper'
import * as Server from './server'

ReactDOM.render((
    <BrowserRouter>
        <LayoutWrapper/>
    </BrowserRouter>
    ), document.getElementById('site-container'));
registerServiceWorker();

Server.fetchData('users');
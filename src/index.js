import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-browser-router'
import './styles/index.css'
import registerServiceWorker from './registerServiceWorker'
import LayoutWrapper from './components/Wrappers/LayoutWrapper'
import configureStore from './configure-store'
import { Provider } from 'react-redux'

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <LayoutWrapper/>
        </BrowserRouter>
    </Provider>
    ), document.getElementById('site-container'));
registerServiceWorker();
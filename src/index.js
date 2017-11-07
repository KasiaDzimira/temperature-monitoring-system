import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-browser-router';
import './styles/scss/index.scss';
import registerServiceWorker from './registerServiceWorker';
import fetchData from './server';
import Register from './components/Forms/Register';
import Header from './components/Header/Header';

ReactDOM.render(<Header />,  document.getElementById('header'));
ReactDOM.render(
    <BrowserRouter>
        <Route path="/register" component={Register} />
    </BrowserRouter>,
    document.getElementById('container'));
registerServiceWorker();
fetchData();
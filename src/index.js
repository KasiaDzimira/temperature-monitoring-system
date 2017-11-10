import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-browser-router';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import fetchData from './server';
import Register from './components/Forms/Register';
import Header from './components/Header/Header';
import HomePage from "./components/HomePage/HomePage";

ReactDOM.render(<Header />,  document.getElementById('header'));
ReactDOM.render(
    <BrowserRouter>
        <div className={'app-container'}>
            <Route path="/" component={HomePage} />
            <Route path="/register" component={Register} />
        </div>
    </BrowserRouter>,
    document.getElementById('container'));
registerServiceWorker();
fetchData();
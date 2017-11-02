import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import fetchData from './server';
import Register from './components/Forms/Register';
import Header from './components/Header/Header';

ReactDOM.render(<Header />,  document.getElementById('header'));
ReactDOM.render(<Register />, document.getElementById('container'));
registerServiceWorker();
fetchData();
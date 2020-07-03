import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';

import './index.scss'
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

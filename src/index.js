import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Home from './components/Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router"
import Routerr from './components/Router';

ReactDOM.render(
 <BrowserRouter >
<Routerr/>
</BrowserRouter>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

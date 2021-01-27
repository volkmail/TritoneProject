import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Redirect} from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
            <Redirect from='/' to='/home'/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

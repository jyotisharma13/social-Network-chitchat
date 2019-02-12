import React from 'react';
import App from './app';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import{ reducer} from './reducers';
import{ Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import{ initSocket} from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
// const elem = (<Provider store={store}><App /></Provider>);

let thingToRender;

if (location.pathname == '/welcome') {
    thingToRender = <Welcome />;
} else {
    // thingToRender = <img src="/logo.png" />;
    // thingToRender = <App />;
    thingToRender = (initSocket(store),
    <Provider store={store}>
        <App />
    </Provider>
    );
}
ReactDOM.render(
    thingToRender,
    document.querySelector('main')
);

///////////////////////////

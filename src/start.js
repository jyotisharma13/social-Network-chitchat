import React from 'react';
import App from './app';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome';

let thingToRender;

if (location.pathname == '/welcome') {
    thingToRender = <Welcome />;
} else {
    // thingToRender = <img src="/logo.png" />;
    thingToRender = <App />;
}
ReactDOM.render(
    thingToRender,
    document.querySelector('main')
);

///////////////////////////
// let component;
// if (location.pathname == "/welcome") {
//     component = <Welcome />;
//     console.log("logged OUT");
// } else {
//     // getSocket(store);
//     component = (
//         // <Provider store={store}>
//         <App />
//         // </Provider>
//     );
//
//     console.log("LOGGED IN");
// }
// ReactDOM.render(
//     component,
//     document.querySelector('main'));

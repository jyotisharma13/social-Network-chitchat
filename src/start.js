import React from 'react';
import ReactDOM from 'react-dom';

import {Welcome} from './welcome';

let thingToRender;

if (location.pathname == '/welcome') {
    thingToRender = <Welcome />;
} else {
    thingToRender = <img src="/logo.png" />;
}

ReactDOM.render(
    thingToRender,
    document.querySelector('main')
);

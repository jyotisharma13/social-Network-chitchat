// all of our front end code eill go here

import * as io from 'socket.io-client';
import {createOnlineUsersList, addUserId, addToOnlineusersList, removeFromOnlineUsersList} from './actions';

let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on('userId', id => {
            store.dispatch(addUserId(id));
        });

        socket.on('onlineUsers', users => {
            store.dispatch(createOnlineUsersList(users));
        });


        socket.on('userJoined', user => {
            store.dispatch(addToOnlineusersList(user));
        });

        socket.on('userLeft', user => {
            store.dispatch(removeFromOnlineUsersList(user));
        });
    }
}

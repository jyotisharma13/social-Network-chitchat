// all of our front end code will go here
// user first name last name and picture in cookieSession
// for getting the information about the chat user then we usse to write the database query for that where user_id

import * as io from 'socket.io-client';
import {createOnlineUsersList, addUserId, addToOnlineusersList, removeFromOnlineUsersList, addChatMessage, receiveChatMessages} from './actions';

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
        socket.on('chatMessages', messages => {
            store.dispatch(receiveChatMessages(messages));
        });

        socket.on('chatMessageFromServer', (newMessage) => {
            console.log('hello new messsage', newMessage);
            store.dispatch(addChatMessage(newMessage));

        });

    }
    return socket;
}

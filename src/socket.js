import * as io from 'socket.io-client';
import {createOnlineUsersList, addUserId, addToOnlineusersList, removeFromOnlineUsersList, receiveChatMessages, addChatMessage, receiveFriendMessages, addFriendMessage, recentlyAddedFriend, removeRecentFriend} from './actions';

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

        socket.on('chatMessageFromServer', newMessage => {
            store.dispatch(addChatMessage(newMessage));
        });

        socket.on('friendMessages', friendMessages => {
            store.dispatch(receiveFriendMessages(friendMessages));
        });

        socket.on('newFriendMessageFromServer', newFriendMessage => {
            store.dispatch(addFriendMessage(newFriendMessage));
        });

        socket.on('reloadFriendMessages', friendship_id => {
            store.dispatch(recentlyAddedFriend(friendship_id));
        });

        socket.on('hideFriendMessages', () => {
            store.dispatch(removeRecentFriend());
        });

    }
    return socket;
}

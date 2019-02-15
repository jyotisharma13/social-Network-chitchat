// * export a function that expects to receive the current state object as the first argument and an action as the second.
//  * function must return a state object
//  * Three conditionals that check the `type` property of the action
//      1. `"RECEIVE_FRIENDS_WANNABES"` - return a new object that has all of the properties that the current state object
//      has but with a new property containing the list of friends and wannabes added.
//      2. `"ACCEPT_FRIEND_REQUEST"` -
//      return a new object that has all of the properties that the current state object has but the array of friends and
//       wannabes is replaced with a new array that has all of the objects that were in the
//       old list of friends and wannabes except one of them is replaced with a whole new object that has all of the properties
//        of the old object except that its `accepted` property is set to `true`.
//      3. `"UNFRIEND"` - return a new object that has all of the properties that the current state object has but the array of
//       friends and wannabes is replaced with a new array that has all of the objects that were in the old list of friends and
//       wannabes except one is filtered out

export function reducer(state={}, action) {

    if (action.type == "RECEIVE_FRIENDS_WANNABEES") {
        const state = { ...state, friendsList : action.list };
        console.log('state in reducersssssssss:',state);
        return state;
    }

    if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        return { ...state, friendsList: state.friendsList.map(
            i => {
                console.log('i in reducer', i);
                if (i.id == action.id) {
                    return {...i, accepted: true};
                } else {
                    return i;
                }
            }
        )};
    }

    if (action.type == 'UNFRIEND') {
        return { ...state, friendsList: state.friendsList.filter(
            i => {
                if (i.id == action.id) {
                    return false;
                } else {
                    return true;
                }
            }
        )};
    }
    //     return state;
    if (action.type == "ADD_USER_ID") {
        state = { ...state, userId : action.userId };
        return state;
    }

    if (action.type == 'CREATE_ONLINE_USERS_LIST') {
        state = { ...state, onlineUsers : action.users };
        return state;
    }

    if (action.type == 'ADD_ONLINE_USERS_LIST') {
        state = { ...state, onlineUsers : state.onlineUsers.concat(action.user) };
        return state;
    }

    if (action.type == 'REMOVE_ONLINE_USERS_LIST') {
        state = { ...state, onlineUsers : state.onlineUsers.filter(
            i => {
                if (i.id == action.id) {
                    return false;
                } else {
                    return true;
                }
            }
        ) };
        return state;
    }

    if (action.type == 'LOAD_CHAT_MESSAGES') {
        state = { ...state, chatMessages : action.messages.reverse() };
        return state;
    }

    if (action.type == 'ADD_CHAT_MESSAGE') {
        console.log("state.chatMessages before concat: ", state.chatMessages);
        state = { ...state, chatMessages : state.chatMessages.concat(action.newMessage) };
        console.log("state.chatMessages after concat: ", state.chatMessages);
        return state;
    }
    if (action.type == 'LOAD_FRIEND_MESSAGES') {
        state = { ...state, friendMessages : action.messages.reverse() };
        return state;
    }
    if (action.type == 'ADD_FRIEND_MESSAGE') {
        if (state.friendMessages) {
            state = { ...state, friendMessages : state.friendMessages.concat(action.newMessage) };
        } else {
            state = { ...state, friendMessages : [action.newMessage]};
        }
        return state;
    }
    if (action.type == 'RECENT_FRIEND') {
        state = { ...state, recentFriend : action.id };
        return state;
    }
    if (action.type == 'RECENT_FRIEND_REMOVE') {
        state = { ...state, recentFriend : false };
        return state;
    }

    return state;
}

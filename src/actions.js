// 1. `receiveFriendsWannabes` - makes ajax GET request to retrieve list of friends and wannabes. The resolved value
//is an action with a property containing the list that was retrieved.
// 2. `acceptFriendRequest` - makes ajax POST request to accept friendship.
// The resolved value is an action with the id of the wannabe
// 3. `unfriend` - makes ajax POST request to end friendship. The resolved value is an action with the id of the friend
import axios from './axios';
///////////////////////////////////////
export function receiveFriendsList() {
    console.log('receiveFriendsListhhhhhhhhhh');
    return axios.get('/friends/list').then(results => {
        console.log('/friends/list action results:', results);
        return {
            type: "RECEIVE_FRIENDS_WANNABEES",
            list: results.data.rows
        };
    });
}
////////////////////////////////////
export function acceptFriendRequest(wannabe_id) {
    return axios.post('/acceptfriendship/' + wannabe_id).then(() => {
        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id: wannabe_id
        };
    });
}
//////////////////////////////////////////
export function unFriend(friend_id) {
    return axios.post('/deletefriendship/' + friend_id ).then(() => {
        return {
            type: "UNFRIEND",
            id: friend_id
        };
    });
}
//////////////////////////////////////////////7
export function addUserId(id) {
    return {
        type: "ADD_USER_ID",
        userId: id
    };
}
////////////////////////////////////////////77
export function createOnlineUsersList(users) {
    return {
        type: "CREATE_ONLINE_USERS_LIST",
        users: users
    };
}
///////////////////////////////

export function addToOnlineusersList(user) {
    return {
        type: "ADD_ONLINE_USERS_LIST",
        user: user
    };
}
/////////////////////////////////////////////

export function removeFromOnlineUsersList(id) {
    return {
        type: "REMOVE_ONLINE_USERS_LIST",
        id: id
    };
}
///////////////////////////////////////
export function receiveChatMessages(messages) {
    return {
        type: "LOAD_CHAT_MESSAGES",
        messages: messages
    };
}
/////////////////////////////////////////
export function addChatMessage(newMessage) {
    return {
        type: "ADD_CHAT_MESSAGE",
        newMessage: newMessage
    };
}
//////////////////////////////////
export function receiveFriendMessages(messages) {
    return {
        type: "LOAD_FRIEND_MESSAGES",
        messages: messages
    };
}
///////////////////////////////////////
export function addFriendMessage(newMessage) {
    return {
        type: "ADD_FRIEND_MESSAGE",
        newMessage: newMessage
    };
}
/////////////////////////////////////////
export function recentlyAddedFriend(friendship_id) {
    return {
        type: "RECENT_FRIEND",
        id: friendship_id
    };
}
///////////////////////////////////////////
export function removeRecentFriend() {
    return {
        type: "RECENT_FRIEND_REMOVE"
    };
}

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
    return axios.post('/deletefriendship/' + friend_id , {action: 'REMOVE FRIEND'}).then(() => {
        return {
            type: "UNFRIEND",
            id: friend_id
        };
    });
}

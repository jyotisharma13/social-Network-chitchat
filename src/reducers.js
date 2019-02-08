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

    return state;
}

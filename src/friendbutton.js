import React from 'react';
// import axios from './axios';

export default class FriendButton extends React.Component{
    constructor(){
        super();
        this.state={
            ButtonText:'Make Friend Request'
        };

    }
    //     componentDidMount(){
    //         //we are to get the initial status of the frinedship
    //         //based off of the initial status we are going to render the appropriate button
    //         // GET /get-intial-status/3
    //         axios.get('/get-initial-status/' + this.props.otheruserId).then(resp => {
    //             // see what inside of resp, and set the setState
    //             // of the button based off of whats in the responses// if we got nothing back from the database..
    //
    //             //button should say 'make friend request'
    //             // if we got something back from the database,
    //             // and if accepted is registerUser// button should say 'end friendship'
    //
    //             // if the accepted the column is false
    //             // in this case, should the button say accept o "cancel friends request"
    //         });
    //     }
    //     updateFriendship(){
    //         // heres where all the post routes are going to go
    //         // what does buttonText say? do something differnet
    //         //based off of what buttonText says!
    //
    //         // ie if the button say' make friend request when it whats
    //         //clicked, then we need to insert into frinedships table
    //     }
    render(){
        console.log('this.props.otheruserId:', this.props.otheruserId);
        return(
            <button > { this.state.ButtonText }</button>
        );
    }
}
// onClick ={this.updateFriendship}

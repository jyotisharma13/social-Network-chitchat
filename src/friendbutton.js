import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            buttonText: 'Send Friend Request'
        };
        this.updateFriendship = this.updateFriendship.bind(this);
    }
    componentDidMount(){
        const self = this;
        axios.get('/get-initial-status/'+ self.props.otherUserId).then((resp) => {
            if (!resp.data.rows[0]) {
                console.log("no resp");
                self.setState({
                    buttonText: 'Send Friend request'
                });
            } else if (resp.data.rows[0].accepted == true){
                console.log("it's accepted");
                self.setState({
                    buttonText: 'Unfriend'
                });
            } else if (resp.data.rows[0].sender_id == this.props.otherUserId
                && resp.data.rows[0].accepted == false){
                this.setState({
                    buttonText: 'Accept Friend Request'
                });
            } else {
                console.log("not accepted");
                this.setState({
                    buttonText: 'Cancel Friend Request'
                });
            }

        });
    }
    updateFriendship(){
        const self = this;
        if (self.state.buttonText == 'Send Friend request'){
            axios.post('/addfriendship/'+ self.props.otherUserId);
            self.setState({
                buttonText: 'Cancel Friend Request'
            });
        } else if (self.state.buttonText == 'Cancel Friend Request'){
            axios.post('/deletefriendship/'+ self.props.otherUserId);
            self.setState({
                buttonText: 'send Friend Request'
            });
        }
        else if (this.state.buttonText == 'Accept Friend Request'){
            axios.post('/acceptfriendship/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Unfriend'
            });
        } else if (this.state.buttonText == 'Unfriend'){
            axios.post('/deletefriendship/'+ this.props.otherUserId);
            this.setState({
                buttonText: 'Send Friend Request'
            });
        }


    }
    render(){
        return(
            <button id="friend_button" onClick={this.updateFriendship}> { this.state.buttonText } </button>
        );
    }

}

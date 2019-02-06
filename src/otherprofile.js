import React from 'react';
import axios from './axios';
// import{ ProfilePic} from "./profilePic";
import FriendButton from './friendbutton';
// import Header from './header';

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidOtherUserId: false
        };
    }
    componentDidMount() {
        console.log('this.props.match.params.id::::',this.props.match.params.id);
        var self = this;
        axios.get('/user/' + this.props.match.params.id + '.json').then(results => {
            console.log("results: ", results);
            console.log("results.data: ", results.data);
            if (results.data.redirectTo) {
                this.props.history.push(results.data.redirectTo);
            } if (results.data.rows.length == 0) {
                console.log('results.data.rows.length',results.data.rows.length);
                self.setState({
                    invalidOtherUserId: false
                });
            } else {
                self.setState({
                    id: results.data.rows[0].id,
                    first:results.data.rows[0].first,
                    last: results.data.rows[0].last,
                    pro_pic_Url: results.data.rows[0].url,
                    bio: results.data.rows[0].bio || 'No bio yet.'
                });
            }
        }).catch(err => {
            console.log('error nnnm in mount otherprofile: ', err);
        });
    }
    render() {
        return (
            <div id="otherprofile_container">
                <div id ="otherprofile_comp">
                    <img id="otherprofile_com" src ={this.state.pro_pic_Url} alt={this.state.first} />
                    <div className="otherprofileinfo">
                        <h1>{this.state.first} {this.state.last}</h1>
                        <h3 className="aboutme">My Bio:{this.state.bio}</h3>

                    </div>
                </div>
                <div id="friend_button0"> <FriendButton
                    otherUserId = { this.props.match.params.id }
                /> </div>
            </div>

        );
    }
}
// <img id="logo_img1" src="/logo.png" />
// <div className="bio-container"><h3> {this.state.bio}</h3></div>

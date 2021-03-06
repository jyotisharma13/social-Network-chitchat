import React from 'react';
// import ProfilePic from './profilePic';
import axios from './axios';
import {Uploader} from './uploader';
import {Profile} from './profile';
// import {BioEditor} from './bioEditor';
import {Header} from "./header";
import {OtherProfile} from './otherprofile';

import {BrowserRouter, Route} from 'react-router-dom';
import Friends from './friends';
import {ConnectedOnlineUsers} from './onlineusers';
import {ConnectedChatMessages} from './chatmessages';
import {ConnectedFriendMessages} from './friendmessages';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uploaderIsVisible:false,
            bioEditorIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.changePictureUrl=this.changePictureUrl.bind(this);
        this.updateProfileBio = this.updateProfileBio.bind(this);
        this.HideUploader = this.HideUploader.bind(this);
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
    }
    //componentDidMount is the react equivalent of mounted in VALUES
    //a Lifecycle method
    componentDidMount() {
        axios.get('/user').then(results => {
            console.log("componentDidMount() results:",results);
            this.setState({
                first: results.data.rows[0].first,
                last: results.data.rows[0].last,
                pro_pic_Url: results.data.rows[0].url,
                bio:results.data.rows[0].bio
            });
        }).catch(err => {
            console.log('error in mount app: ', err);
        });
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    HideUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    changePictureUrl(url) {
        this.setState({
            pro_pic_Url: url,
            uploaderIsVisible: false
        });
    }
    toggleBioEditor() {
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible
        });
    }
    updateProfileBio(bio){
        console.log("updateBio running!");
        this.setState({
            bio: bio
        });
    }
    render(){
        return(
            <div>

                <BrowserRouter>
                    <div>
                        <img id="logo_img1" src="/logo.png" />

                        <Header
                            first={this.state.first}
                            last={this.state.last}
                            pro_pic_Url={this.state.pro_pic_Url}
                            showUploader={this.showUploader}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="app_container">
                                    <div className="app_comp2">
                                        <Profile
                                            id={this.state.id}
                                            first ={this.state.first}
                                            last={this.state.last}
                                            pro_pic_Url={this.state.pro_pic_Url}
                                            showUploader={this.showUploader}
                                            bio={this.state.bio}
                                            updateProfileBio={this.updateProfileBio}
                                            ShowUploader = {this.ShowUploader}
                                            toggleBioEditor={this.toggleBioEditor}
                                            bioEditorIsVisible={this.state.bioEditorIsVisible}
                                        />
                                        {this.state.uploaderIsVisible && <Uploader
                                            first={this.state.first}
                                            last={this.state.last}
                                            pro_pic_Url={this.state.pro_pic_Url}
                                            HideUploader={this.HideUploader}
                                            changePictureUrl={this.changePictureUrl}
                                        />}

                                    </div>
                                </div>

                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <div key={props.match.url}>
                                    <OtherProfile
                                        match={props.match}
                                        history={props.history}
                                    />
                                    <ConnectedFriendMessages
                                        match={props.match}
                                    />
                                </div>
                            )}
                        />

                        <Route
                            path="/friends"
                            component={Friends}
                        />
                        <Route
                            path="/online"
                            render={() => (
                                <div>
                                    <ConnectedOnlineUsers />
                                </div>
                            )}
                        />
                        <Route
                            path ="/chat"
                            component={ConnectedChatMessages}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
// <Route
//     path="/user/:id"
//     render={props => (
//         <OtherProfile
//             key={props.match.url}
//             match={props.match}
//             history={props.history}
//
//         />
//     )}
// />
// <Route
//     path ="/online"
//     component={ConnectedOnlineUsers}
//
// />

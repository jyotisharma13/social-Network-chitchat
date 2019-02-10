import React from 'react';
import {receiveFriendsList, acceptFriendRequest, unFriend} from './actions';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsList());
    }
    render() {
        return (
            <div className="friendsList">
                <div className="wannabeContainer">

                    {this.props.wannabes && this.props.wannabes.map(
                        i => {
                            return (

                                <div key={i.id} className="wannabeItem">
                                    {<Link to={`/user/${i.id}`} key={i.id}><div className="wannabeItemPicture">
                                        <img id="wannabe_item" src={i.img_url || "/defaultimage.jpg"} />

                                    </div>
                                    </Link>}
                                    <div classsName="wannabe_name">
                                        <h2>{i.first} {i.last}</h2>
                                        <button onClick={
                                            () => this.props.dispatch(acceptFriendRequest(i.id))
                                        }>ACCEPT</button>
                                    </div>
                                </div>
                            );
                        }
                    )}

                </div>
                <div className="friendsListContainer">
                    <div className="friendsContainer">
                        {this.props.friends && this.props.friends.map(
                            i => {
                                return (
                                    <div key={i.id} className="friendItem">
                                        {<Link to={`/user/${i.id}`} key={i.id}><div className="friendItemPicture">
                                            <img id="wannabe_item" src={i.img_url || "/defaultimage.jpg"} />

                                        </div>
                                        </Link>}
                                        <div className="friend_name">
                                            <h2>{i.first} {i.last}</h2>
                                            <button onClick={
                                                () => this.props.dispatch(unFriend(i.id))
                                            }> UNFRIEND</button>
                                        </div>
                                    </div>
                                );
                            }
                        )}

                    </div>
                </div>
            </div>
        );
    }
}

//this function will run everytime the redux state is updated
const mapStateToProps = function(state) {
    console.log('hellooooooooooooooo state',state);
    if (!state.friendsList) {
        return {};
    } else {
        return {
            friends: state.friendsList.filter(
                i => {
                    if (i.accepted) {
                        return true;
                    } else {
                        return false;
                    }
                }
            ),
            wannabes: state.friendsList.filter(
                i => {
                    if (!i.accepted) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
        };
    }
};
export default connect(mapStateToProps)(Friends);

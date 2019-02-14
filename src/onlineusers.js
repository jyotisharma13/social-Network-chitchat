import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.onlineUsers) {
            return null;
        }
        return (
            <div className="onlineUsersList">

                <div className="onlineUsersListContainer">
                    {this.props.onlineUsers.length > 0 && <h1>The people are online right now:</h1>}
                    {this.props.onlineUsers.length == 0 && <h1>No body Online</h1>}
                    {this.props.onlineUsers && <div className="onlineUserContainer">
                        {this.props.onlineUsers && this.props.onlineUsers.map(
                            i => {
                                return (
                                    <div key={i.id} className="onlineUserItem">
                                        {<Link to={`/user/${i.id}`} key={i.id}>
                                            <div className="onlineUserItemPicture">

                                                <img src={i.img_url || "/defaultimage.jpg"} />
                                            </div>
                                            <div className="onlineUserItemInfo">
                                                <div className="green"></div><h2>{i.first} {i.last}</h2>

                                            </div>
                                        </Link>}
                                    </div>
                                );
                            }
                        )}
                    </div>}
                </div>

            </div>
        );
    }
}

const mapStateToProps = function(state) {
    if (!state.onlineUsers) {
        return {};
    } else {
        return {
            onlineUsers: state.onlineUsers
        };
    }
};

export let ConnectedOnlineUsers = connect(mapStateToProps)(OnlineUsers);

import React from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';

export class SearchUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }
    handleChange(e) {
        this.setState({
            draftSearch: e.target.value
        });
    }
    search(e) {
        e.preventDefault();
        var self = this;
        axios.post('/search', {text: self.state.draftSearch + '%'}).then(results => {
            console.log("results.data", results.data);
            if (results.data.error) {
                self.setState({
                    error: true
                });
            } else {
                //make sure that users is an array of user objects!
                self.setState({
                    users: results.data.rows
                });
            }
        });
    }
    render() {
        return (
            <div className="searchUsers">

                <div className="searchUsersListContainer">

                    <h1>Search Friends</h1>
                    <input onChange={this.handleChange}/>
                    <button onClick={this.search}>SEARCH</button>

                    {this.state.error && <div className="error">Oops, something went wrong!</div>}

                    {this.state.users && <div className="searchUsersList">
                        {this.state.users && this.state.users.map(
                            i => {
                                return (
                                    <div key={i.id} className="searchUserItem">
                                        {<Link to={`/user/${i.id}`} key={i.id}>
                                            <div className="searchUserItemPicture">
                                                <img src={i.img_url || "/defaultimage.jpg"} />
                                            </div>
                                            <div className="searchUserItemInfo">
                                                <h2>{i.first} {i.last}</h2>
                                            </div>
                                        </Link>}
                                    </div>
                                );
                            }
                        )}
                        <div className="emptyDiv"></div>
                    </div>}

                </div>

            </div>
        );
    }
}

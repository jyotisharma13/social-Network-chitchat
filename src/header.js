import React from 'react';
import {ProfilePic} from './profilePic';

// import { Link } from 'react-router-dom';

export function Header(props) {
    return (
        <header>
            <div className="header-content">

                <h1 id="chitchatfun">CHIT CHAT FUN !!!!!</h1>

                <ProfilePic
                    first={props.first}
                    last={props.last}
                    pro_pic_Url={props.pro_pic_Url}
                    showUploader={props.showUploader}
                />
                <a href ="/">{props.first}</a>
                <a href="/logout" id="logoutLink"><p>Logout</p></a>

            </div>
        </header>
    );
}
// <Link to="/" id="profileLink"><p>{this.props.first}</p></Link>
// <Link to="/friends" id="friendslink"><p>Friends</p></Link>

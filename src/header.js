import React from 'react';
import {ProfilePic} from './profilePic';

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
            </div>
        </header>
    );
}

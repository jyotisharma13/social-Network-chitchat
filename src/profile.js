import React from 'react';
import ProfilePic from './profilePic';
// import {BioEditor} from './bioEditor'

export default function Profile(props){
    return(
        <div id="profile_container">
            <ProfilePic
                onClick={props.showUploader}
                id={props.id}
                first ={props.first}
                last={props.last}
                pro_pic_Url={props.pro_pic_Url}
                showUploader={props.showUploader}
            />

        </div>
    );
}

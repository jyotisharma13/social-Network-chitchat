import React from 'react';
import {ProfilePic} from './profilePic';
import {BioEditor} from './bioEditor';

export function Profile(props){
// default
    return(
        <div id="profile_container">
            <div id="pro_bio_comp">
                <ProfilePic
                    onClick={props.showUploader}
                    id={props.id}
                    first ={props.first}
                    last={props.last}
                    pro_pic_Url={props.pro_pic_Url}
                    showUploader={props.showUploader}
                />

                <BioEditor
                    bio={props.bio}
                    ShowUploader = {props.ShowUploader}
                    updateProfileBio={props.updateProfileBio}
                    toggleBioEditor={props.toggleBioEditor}
                    bioEditorIsVisible={props.bioEditorIsVisible}
                />
            </div>
        </div>
    );
}

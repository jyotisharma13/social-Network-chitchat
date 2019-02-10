import React from 'react';
import {ProfilePic} from './profilePic';
import {BioEditor} from './bioEditor';
export function Profile(props){
// default
    return(
        <div id="profile_container">
            <div id="pro_bio_comp">
                <div id="pro_photo" onClick={props.showUploader}>
                    <ProfilePic
                        id={props.id}
                        pro_pic_Url={props.pro_pic_Url}
                        showUploader={props.showUploader}
                    />
                </div>
                <div id="profileInfo">
                    <h3>{props.first} {props.last}</h3>

                    <BioEditor
                        bio={props.bio}
                        ShowUploader = {props.ShowUploader}
                        updateProfileBio={props.updateProfileBio}
                        toggleBioEditor={props.toggleBioEditor}
                        bioEditorIsVisible={props.bioEditorIsVisible}
                    />
                </div>
            </div>
        </div>
    );
}

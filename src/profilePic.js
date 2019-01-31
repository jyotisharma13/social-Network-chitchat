import React from 'react';
export default function ProfilePic(props){
    console.log('props:',props);
    // we can see the first name last name and profile pic should be in props.
    let url;
    if (props.pro_pic_Url === null) {
        url = "/defaultimage.jpg";
    } else {
        url = props.pro_pic_Url;
    }
    let name = props.first + ' ' + props.last;
    return (
        <div onClick={props.showUploader}>
            <img src={url} alt={name} />

        </div>
    );
}
// <h1>welcome, {props.first} {props.last}{props.pro_pic_Url}</h1>
// <img src="/defaultimage.jpg" />

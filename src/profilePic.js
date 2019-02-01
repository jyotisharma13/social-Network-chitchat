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
    return (
        <div id="pro_pic" onClick={props.showUploader}>
            <img id="img_pro" src={url} />
            <h1>{props.first} {props.last}</h1>
        </div>
    );
}
// <h1>welcome, {props.first} {props.last}{props.pro_pic_Url}</h1>
// <img src="/defaultimage.jpg" />

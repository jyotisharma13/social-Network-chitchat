// import React from 'react';
// import axios from './axios';
// export default class Uploader extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={};
//         this.uploadFile= this.uploadFile.bind(this);
//     }
//     uploadFile(e){
//         e.preventDefault();
//         // console.log('this.form.description:', this.form.description);
//         // console.log('this.form.title:', this.form.title);
//         // console.log('this.form.name:', this.form.name);
//         var file = document.getElementById('file');
//         console.log('file:', file);
//         var uploadedFile = file.files[0];
//         console.log('uploadedfile:',uploadedFile);
//         // we want to send uploadedfiles to the server
//         //we use formData to send files to server
//         //formData is only for files
//         var formData =  new FormData();
//         formData.append('file', uploadedFile);
//         // formData.append('title',this.form.title);
//         // formData.append('name',this.form.name);
//         // formData.append('description',this.form.description);
//         // post/upload and we are sending files, title, name , description to server as part of the request
//         // var self = this;
//         axios.post('/profilePic/upload', formData).then(response=>{
//             console.log("response: ", response);
//             this.props.changePictureUrl(response.data.image);
//         }).catch(error=>{
//             console.log(error);
//         });
//     }
//     render(){
//         return (
//             <div>
//                 <h1>Uploader</h1>
//                 <input id="file" type ="file" />
//                 <button onClick={this.uploadFile}>Upload</button>
//             </div>
//         );
//     }
// }
import React from 'react';
import axios from './axios';

import {ProfilePic} from './profilePic';

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.uploadFile = this.uploadFile.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showFilename = this.showFilename.bind(this);
    }
    uploadFile(e) {
        e.preventDefault();
        var file = document.getElementById('file');
        var uploadedFile = file.files[0];
        console.log('file:', file);
        console.log('uploadedfile:',uploadedFile);
        e.preventDefault();
        // console.log('this.form.description:', this.form.description);
        // console.log('this.form.title:', this.form.title);
        // console.log('this.form.name:', this.form.name);

        // we want to send uploadedfiles to the server
        //we use formData to send files to server
        //formData is only for files
        var formData =  new FormData();
        formData.append('uploadedFile', uploadedFile);
        // formData.append('title',this.form.title);
        // formData.append('name',this.form.name);
        // formData.append('description',this.form.description);
        // post/upload and we are sending files, title, name , description to server as part of the request
        // var self = this;
        axios.post('/profilePic/upload', formData).then(response=>{
            console.log("response: ", response);
            this.props.changePictureUrl(response.data.image);
        }).catch(error=>{
            console.log(error);
        });
    }
    closeModal(e) {
        if (e.target == document.getElementById('uploader')) {
            this.props.HideUploader();
        } else {
            return;
        }
    }
    showFilename() {
        console.log("showfilename!!!!",document.getElementById('file').files[0].name);
        this.setState({
            filename: document.getElementById('file').files[0].name
        });
    }
    render() {
        return (
            <div onClick={this.closeModal} id="uploader">
                <div className="uploader-content">
                    <ProfilePic
                        first={this.props.first}
                        last={this.props.last}
                        pro_pic_Url={this.props.pro_pic_Url}
                    />
                    <h3>Change profile picture</h3>
                    <label className="custom-file-upload">
                        <input
                            name="file-upload"
                            id="file"
                            type="file"
                            onChange={this.showFilename}
                        />
                            choose image
                    </label>
                    {this.state.filename && <div id="filename">{this.state.filename}</div>}
                    <button onClick={this.uploadFile}>UPLOAD</button>
                </div>
            </div>
        );
    }
}

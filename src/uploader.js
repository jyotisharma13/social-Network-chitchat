import React from 'react';
import axios from './axios';
export default class Uploader extends React.Component{
    constructor(){
        super();
        this.state={};
    }
    uploadFile(e){
        e.preventDefault();
        // console.log('this.form.description:', this.form.description);
        // console.log('this.form.title:', this.form.title);
        // console.log('this.form.name:', this.form.name);
        var file = document.getElementById('file');
        console.log('file:', file);
        var uploadedFile = file.files[0];
        console.log('uploadedfile:',uploadedFile);
        // we want to send uploadedfiles to the server
        //we use formData to send files to server
        //formData is only for files
        var formData =  new FormData();
        formData.append('file', uploadedFile);
        // formData.append('title',this.form.title);
        // formData.append('name',this.form.name);
        // formData.append('description',this.form.description);
        // post/upload and we are sending files, title, name , description to server as part of the request
        axios.post('/upload', formData).then(function(response){
            console.log("response: ", response);
            this.props.changePictureUrl(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    render(){
        return (
            <div>
                <h1>Uploader</h1>
                <input id="file" type ="file" />
                <button onClick={this.uploadFile}>Upload</button>
            </div>
        );
    }
}

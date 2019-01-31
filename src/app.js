import React from 'react';
// import Logo from './logo';
import ProfilePic from './profilePic';
import axios from 'axios';
import Uploader from './uploader';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uploaderIsVisible:false
        };
        this.showUploader = this.showUploader.bind(this);
        this.changePictureUrl=this.changePictureUrl.bind(this);
    }
    //componentDidMount is the react equivalent of mounted in VALUES
    //a Lifecycle method
    componentDidMount() {
        axios.get('./user').then(results => {
            console.log("componentDidMount() results:",results);
            this.setState({
                first: results.data.rows[0].first,
                last: results.data.rows[0].last,
                pro_pic_Url: results.data.rows[0].img_url
            });
        }).catch(err => {
            console.log('error in mount app: ', err);
        });
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    changePictureUrl(url) {
        this.setState({
            pro_pic_Url: url,
            uploaderIsVisible: false
        });
    }
    render(){
        return(
            <div>
                <img id="logo_img" src="/logo.png" />
                <ProfilePic
                    first ={this.state.first}
                    last={this.state.last}
                    pro_pic_Url={this.state.pro_pic_Url}
                    showUploader={this.showUploader}

                />
                { this.state.uploaderIsVisible && <Uploader changePictureUrl={this.changePictureUrl} /> }
            </div>
            // if left hand side is true then Upload image
            // <h1>welcome, { this.state.first }!!!!!</h1>
        );
    }
}

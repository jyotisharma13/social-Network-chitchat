import React from "react";
import axios from './axios';
// import {ProfilePic} from './profilePic';

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.state = {
            editing: false,
            biodraft: ""
        };
    }
    updateBio(){
        this.setState(()=>{
            return {
                editing:false,
                // biodraft:this.props.biodraft,
                newbio:this.state.biodraft
            };
        });
        axios.post("/updatebio" ,{
            biodraft: this.state.biodraft
        }).then(({data})=>{
            console.log("data in updateBio", data);
            this.props.updateProfileBio(data);
            
        });
    }

    handleEditing(e){
        e.preventDefault();
        this.setState(()=>{
            return {
                editing:true,
                biodraft:this.props.biodraft,
                bio:this.props.bio
            };
        });
    }

    handleChange(e){
        this.setState({biodraft: e.target.value});
    }
    render() {
        return (
            <div id="bioeditor_comp">
                {this.state.newbio ||this.props.bio ? (<div><p>{this.props.bio}</p> <button onClick={this.handleEditing}>Edit Bio</button></div>) :
                    (<div>Add your Bio Now<button onClick={this.handleEditing}>Add Bio</button></div>)}
                {this.state.editing && <div><textarea name="textarea" placeholder="Enter Bio Here" onChange={this.handleChange}>
                </textarea> <button onClick={this.updateBio}>UPDATE</button></div>}
            </div>
        );
    }
}
// <h1>{this.state.first}{this.props.last}</h1>

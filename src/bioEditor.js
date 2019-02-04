import React from "react";
import axios from './axios';


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
        axios.post("/updatebio" ,{
            biodraft: this.state.biodraft
        }).then(({data})=>{
            console.log("data in updateBio", data);
            this.props.updateProfileBio(data.bio);

        });
    }

    handleEditing(){
        this.setState(()=>{
            return {
                editing:true

            };
        });
    }

    handleChange(e){
        this.setState({biodraft: e.target.value});
    }


    render() {
        return (
            <div id="bioeditor_comp">
                <h1>{this.state.first}{this.props.last}</h1>
                {this.props.bio ? (<div><p>{this.props.bio}</p> <button onClick={this.handleEditing}>Edit Bio</button></div>) : (<div>Want to write Bio<button onClick={this.handleEditing}>Add Bio</button></div>)}
                {this.state.editing && <div><textarea name="textarea" placeholder="Enter Bio Here" onChange={this.handleChange}></textarea> <button onClick={this.updateBio}>UPDATE</button></div>}
            </div>
        );
    }
}

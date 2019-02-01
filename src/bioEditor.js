import React from 'react';
import axios from './axios';
export class BioEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.handleChange= this.handleChange.bind(this);
        this.submit= this.submit.bind(this);
    }
    handleChange(e){
        // this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submit(){
        axios.post('./bio',{
            bio:this.state.bio
        }.then(results =>{
            console.log("./bio results",results);
        }));
    }
    render(){
        return (
            <div className="bioeditor-comp">
                {this.state.error && <div className="error">Oops, something went wrong!</div>}
                <textarea name="bio"  onChange={this.handleChange}/>
                <button onClick={this.submit}>SAVE</button>
            </div>

        );
    }
}

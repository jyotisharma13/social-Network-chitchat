import React from 'react';
import axios from 'axios';
export class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.handleChange= this.handleChange.bind(this);
        this.submit= this.submit.bind(this);
    }
    handlebarChange(e){
        // this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submit(){
        axios.post('/register',{
            first: this.first,
            last: this.last,
            email: this.email,
            password: this.password
        }).then(({data})=>{
            if(data.success) {
                //reload the page (the server will redirect to the / route)
                //the replace method is perfect because the /welcome route will not even be in browser history (user can't go back there with back button)
                location.replace('/');
            } else {
                this.setState({
                    error:true
                });
            }
        });
    }
    render(){
        return (
            <div className="register-comp">
                {this.state.error && <div className="error">Oops, something went wrong!</div>}
                <input name="first" placeholder="first Name" onChange={this.handleChange} />
                <input name="last" placeholder="last Name" onChange={this.handleChange} />
                <input name="email" placeholder="email" onChange={this.handleChange} />
                <input name="password" placeholder="password" type="password" onChange={this.handleChange} />
                <button onClick={this.submit}>REGISTER</button>
            </div>

        );
    }
}


export function Welcome(){
    return (
        <div>
            <Registration />
        </div>
    );
}

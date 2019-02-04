import React from 'react';
import axios from './axios';

import {Link, HashRouter, Route} from 'react-router-dom';


export class Login extends React.Component{
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
        console.log("email",this.state.email);
        axios.post('/welcome/login',{
            email: this.state.email,
            password: this.state.password
        }).then(({data})=>{
            this.setState({
                notregistered: null,
                error: null
            });
            if(data.success) {
                //reload the page (the server will redirect to the / route)
                //the replace method is perfect because the /welcome route will not even be in browser history (user can't go back there with back button)
                location.replace('/');
            } else if(data.notregistered) {
                this.setState({
                    notregistered:true
                });
            } else {
                this.setState({
                    error:true
                });
            }
        });
    }
    render(){
        return (
            <div className="login-comp">
                {this.state.error && <div className="error">Oops, something went wrong!</div>}
                {this.state.notregistered && <div className="notregistered">Your are not registered, please registered first !!</div>}
                <input name="email" placeholder="email" onChange={this.handleChange} />
                <input name="password" placeholder="password" type="password" onChange={this.handleChange} />
                <button onClick={this.submit}>Login</button>
                <p>Not yet register? <Link to="/">Register</Link> here.</p>
            </div>

        );
    }
}

export class Registration extends React.Component{
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
        console.log("first,last,email",this.first,this.last,this.email);
        axios.post('/welcome/register',{
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password
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
                <button onClick={this.submit}>SUBMIT</button>
                <h3>Already a Register? <Link to="/login">Login</Link> here.</h3>
            </div>

        );
    }
}

export function Welcome(){
    return (
        <div className="welcome-page">
            <h1>Chit Chat Fun!</h1>
            <img src="/logo.png" />
            <h3>Register and make online friends</h3>
            <HashRouter>
                <div>
                    <Route exact path ="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

import React from 'react';
export class Logo  extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    }

    render(){
        return( <div className="logoContainer">
            <img className="logo" src="/logo.png" alt=""/>
        </div>
        );
    }
}

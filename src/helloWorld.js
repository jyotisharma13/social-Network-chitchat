import React from 'react';
export default class Hello extends React.component{
    constructror(props){
        super(props);
        console.log(this.props);
    }
    render(){
        return(
            <div>
            hello , World
            <tamatoBox>
            <username name ={name}/>
        )
    }
}
//
// function HelloWorld() {
//     return (
//         <div>Hello, World!, {elem} Today i will start with react , Hello, World!, <input /></div>
//         // <div>Hello, World!, <input /> </div>
//     );
}
// // if you return null not wil be visible
// if you do like that return;
// 4; it will show the return is undefind
// function HelloWorld() {
//     return (
// 	<div style={{
//         color:'tamato',
//     }}>
//
// <div id={`hello,${Date.now()}`}></div>
//         <div>Hello, World!, {elem} Today i will start with react</div>,
//         <div>Hello, World!, <input /> </div>
//
//
//     );
// }

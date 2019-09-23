import React from 'react';
import {render} from 'react-dom';
import './index.css';

class HelloWorld extends React.Component{
    render(){
        return (<div>Hello World </div>)
    }
}

render(<HelloWorld></HelloWorld>,document.getElementById('root'))
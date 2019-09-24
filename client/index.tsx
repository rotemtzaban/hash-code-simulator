import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Example from './components/ExampleComponent'

class HelloWorld extends React.Component{
    render(){
        return (<div>Hello World
            <Example foo={4}/>
        </div>)
    }
}

render(<HelloWorld></HelloWorld>,document.getElementById('root'))
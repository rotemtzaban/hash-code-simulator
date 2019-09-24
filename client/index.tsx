import React from 'react';
import {render} from 'react-dom';
import './index.css';
import ButtonAppBar from './components/AppBar'
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

class HelloWorld extends React.Component{
    render(){
        return (<div>
            <ThemeProvider theme={createMuiTheme()}>
            <ButtonAppBar isLoggedIn={true} />
            </ThemeProvider>
        </div>)
    }
}

render(<HelloWorld></HelloWorld>,document.getElementById('root'))
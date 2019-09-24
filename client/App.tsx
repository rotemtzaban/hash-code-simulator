import React from 'react';
import './index.css';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { RouteComponentProps, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import ScoreBoard from './components/ScoreBoard';

class HelloWorld extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <div>
                <ThemeProvider theme={createMuiTheme()}>
                    <ButtonAppBar/>
                    <Route exact path='/signup'>
                        <SignUp />
                    </Route>
                    <Route exact path='/scoreboard'>
                        <ScoreBoard />
                    </Route>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(HelloWorld);

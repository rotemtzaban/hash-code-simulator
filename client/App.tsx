import React from 'react';
import './index.css';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { RouteComponentProps, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';

class HelloWorld extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <div>
                <ThemeProvider theme={createMuiTheme()}>
                    <ButtonAppBar isLoggedIn={true} />
                    <Route exact path='/signup'>
                        <SignUp />
                    </Route>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(HelloWorld);

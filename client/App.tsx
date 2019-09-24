import React from 'react';
import './index.css';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Router, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

class HelloWorld extends React.Component<RouteComponentProps<any>> {
    render() {
        return (
            <div>
                <ThemeProvider theme={createMuiTheme()}>
                    <Router history={this.props.history}>
                        <ButtonAppBar isLoggedIn={true} />
                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(HelloWorld);

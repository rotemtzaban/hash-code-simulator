import React from 'react';
import './index.css';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider, createStyles } from '@material-ui/styles';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Router, RouteComponentProps, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import ScoreBoard from './components/ScoreBoard';
import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import QuestionCard from './components/QuestionCard';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        item: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(3)
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    });

class HelloWorld extends React.Component<
    RouteComponentProps<any> & WithStyles<typeof styles>
> {
    render() {
        return (
            <div>
                <ThemeProvider theme={createMuiTheme()}>
                    <Router history={this.props.history}>
                        <ButtonAppBar />
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/scoreboard">
                            <div style={{ margin: '80px' }}>
                                <ScoreBoard />
                            </div>
                        </Route>
                        <Route exact path="/">
                            <Grid container>
                                <Grid
                                    item
                                    xs={3}
                                    className={this.props.classes.item}
                                >
                                    <QuestionCard />
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className={this.props.classes.item}
                                >
                                    <Paper
                                        className={this.props.classes.paper}
                                    ></Paper>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    className={this.props.classes.item}
                                >
                                    <Typography
                                        variant="h6"
                                    >
                                        Scoreboard
                                    </Typography>
                                    <ScoreBoard />
                                </Grid>
                            </Grid>
                        </Route>
                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(HelloWorld));

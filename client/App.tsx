import React from 'react';
import './index.css';
import ButtonAppBar from './components/AppBar';
import { ThemeProvider, createStyles } from '@material-ui/styles';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Router, RouteComponentProps, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import ScoreBoard, { TeamRecord } from './components/ScoreBoard';
import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import QuestionCard from './components/QuestionCard';
import SubmissionDialog from './components/SubmissionModal';
import { Button } from '@material-ui/core';
import DataFetcher from "./dataFetcher"
import dataFetcher from './dataFetcher';

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

interface AppState {
    isSubmissionInProgress: boolean;
    data: TeamRecord[]
}

type AppProps = RouteComponentProps<any> & WithStyles<typeof styles>;

class HelloWorld extends React.Component<
    AppProps, AppState>
{
    constructor(props: AppProps) {
        super(props);
        this.state = { isSubmissionInProgress: false, data: [] };
    }

    async componentWillMount() {
        var scoreBoard = await dataFetcher.GetScoreboard()
        this.setState({data: scoreBoard});
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={createMuiTheme()}>
                    <Router history={this.props.history}>
                        <ButtonAppBar onSubmitButtonClick={() => this.setState({ isSubmissionInProgress: true })} />
                        <SubmissionDialog open={this.state.isSubmissionInProgress} onClose={() => this.setState({ isSubmissionInProgress: false })}></SubmissionDialog>
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/scoreboard">
                            <div style={{ margin: '80px' }}>
                                <ScoreBoard data={this.state.data} />
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
                                    <Button onClick={async () => {
                                        await DataFetcher.MakeAuthGetFetchReuquest("/team/submitscore");
                                    }}>fake submit</Button>
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
                                    <ScoreBoard data={this.state.data} />
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

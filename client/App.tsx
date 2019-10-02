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
import { borderTop, borderColor } from '@material-ui/system';
import withAuth, { AuthComponenetProps } from './components/Auth/AuthManager/AuthProvider';
import TeamResult from './components/Models/TeamResult';
import TeamScoreBoard from './components/TeamScoreBoard';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        item: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(3)
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.primary
        },
        bottomGrid: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(3),
            borderTop: "3px solid",
            borderColor: theme.palette.primary.light,
        }
    });

interface AppState {
    isSubmissionInProgress: boolean;
    scoreboardData: TeamRecord[],
    topScore: number,
    teamResult?: TeamResult
}

type AppProps = RouteComponentProps<any> & WithStyles<typeof styles> & AuthComponenetProps;

class SinglePageApp extends React.Component<
    AppProps, AppState>
{
    interval: number;
    constructor(props: AppProps) {
        super(props);
        this.interval = 0;
        this.state = { isSubmissionInProgress: false, scoreboardData: [], topScore: 0 };
    }


    tick = async () => {
        var scoreBoard = await dataFetcher.GetScoreboard()
        if (this.props.isLoggedIn) {
            const teamResult = await dataFetcher.GetTeamResults();
            const topScore: number = teamResult.topScore.a + teamResult.topScore.b + teamResult.topScore.c + teamResult.topScore.d + teamResult.topScore.e;
            this.setState({ scoreboardData: scoreBoard, teamResult, topScore });
            return;
        }
        this.setState({ scoreboardData: scoreBoard });
    }

    componentDidMount() {
        this.interval = window.setInterval(() => this.tick(), 5000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    async componentWillMount() {
        this.tick()
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
                                <ScoreBoard data={this.state.scoreboardData} />
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
                                    <ScoreBoard data={this.state.scoreboardData} />
                                </Grid>
                                {this.props.isLoggedIn && this.state.teamResult &&
                                    <Grid
                                        item
                                        xs={12}
                                        className={this.props.classes.bottomGrid}
                                    >

                                        <Typography
                                            variant="h3"
                                        >
                                            Team Details
                                        </Typography>
                                        <Typography
                                            style={{ color: "rgb(49, 140, 201)" }}
                                            variant="h6"
                                        >
                                            Team Current Top Score: {this.state.topScore}
                                        </Typography>
                                        <Typography
                                            style={{ color: "rgb(49, 140, 201)" }}
                                            variant="h6"
                                        >
                                            All Team Submissions:
                                        </Typography>
                                        <TeamScoreBoard data={this.state.teamResult} />
                                    </Grid>
                                }
                            </Grid>
                        </Route>
                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(withAuth(SinglePageApp)));

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styles from './styles';
import { WithStyles, withStyles } from '@material-ui/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import  MenuItem  from '@material-ui/core/MenuItem';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Score from '@material-ui/icons/Score';
import withAuth from '../Auth/AuthManager/AuthProvider';
import { AuthComponenetProps } from '../Auth/AuthManager/AuthProvider';

import AuthManager from '../Auth/AuthManager/AuthManager';
import SubmissionDialog from '../SubmissionModal';

interface AppBarProps
    extends WithStyles<typeof styles>,
        AuthComponenetProps,
        RouteComponentProps<any> {
            onSubmitButtonClick:() => void;
        }

function ButtonAppBar(props: AppBarProps) {
    const { classes } = props;
    const toolbarTittle = 'Hashcode';
    let toolbarButtons: React.ReactNode[] = [];
    toolbarButtons.push(
        <MenuItem onClick={() => props.history.push('/scoreboard')}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Score />
            </IconButton>
            <p>Scoreboard</p>
        </MenuItem>,
        <MenuItem onClick={props.onSubmitButtonClick}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <CloudUpload />
            </IconButton>
            <p>Submit Try</p>
        </MenuItem>,
        <Typography variant="body2">
            {props.user ? props.user.username : ''}
        </Typography>,
        <IconButton
            style={{ borderRadius: '10px', fontSize: '16px' }}
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
                AuthManager.signOut();
                props.history.push('/');
            }}
        >
            <ExitToApp />
            Sign out
        </IconButton>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => props.history.push('/')}
                        color="inherit"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {toolbarTittle}
                    </Typography>
                    {props.isLoggedIn &&
                        toolbarButtons.map((station, index) => (
                            <div key={index}> {station} </div>
                        ))}
                    {!props.isLoggedIn && (
                        <Button
                            onClick={e => props.history.push('/signin')}
                            color="inherit"
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(withAuth(withStyles(styles)(ButtonAppBar)));

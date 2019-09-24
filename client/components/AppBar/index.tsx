import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles'
import { WithStyles, withStyles } from '@material-ui/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MenuItem, Menu } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Score from '@material-ui/icons/Score';


interface AppBarProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
  isLoggedIn: boolean;
}

function ButtonAppBar(props: AppBarProps) {
  const { classes } = props;
  const toolbarTittle = "Hashcode";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {toolbarTittle}
          </Typography>
          {props.isLoggedIn &&
            < MenuItem onClick={() => props.history.push("/submit")}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <CloudUpload />
              </IconButton>
              <p>Submit Try</p>
            </MenuItem >}
          {props.isLoggedIn &&
            < MenuItem onClick={() => props.history.push("/scoreboard")} >
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Score />
              </IconButton>
              <p>Scoreboard</p>
            </MenuItem >
          }
          {!props.isLoggedIn &&
            <Button onClick={() => props.history.push("/signup")} color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div >
  );
}

export default withStyles(styles)(withRouter(ButtonAppBar));
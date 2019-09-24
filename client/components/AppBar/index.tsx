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

interface AppBarProps extends WithStyles<typeof styles> , RouteComponentProps<any> {
  isLoggedIn : boolean;
}

function ButtonAppBar(props: AppBarProps) {
  const {classes} = props;
  const toolbarTittle = props.isLoggedIn ?  "Hashcode" :"Sign in to start";
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
          <Button onClick={() => props.history.push("/signup")} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(withRouter(ButtonAppBar));
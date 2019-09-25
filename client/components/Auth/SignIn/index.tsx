import { TextField, WithStyles, InputAdornment, IconButton, withStyles, Container, Avatar, Typography, Button } from "@material-ui/core";
import React from "react";
import styles from "./styles"
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import withAuth from "../AuthManager/AuthProvider"
import { AuthComponenetProps } from '../AuthManager/AuthProvider';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface State {
    password: string;
    username: string;
    showPassword: boolean;
}

interface Props extends WithStyles<typeof styles>, AuthComponenetProps, RouteComponentProps<any> {
}

class SignIn extends React.Component<Props, State>
{
    constructor(props: Props) {
        super(props);
        this.state =
            {
                password: "",
                username: "",
                showPassword: true
            }
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.isLoggedIn) {
            newProps.history.push("/");
            return;
        }
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push("/");
        }
    }

    handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        let { classes } = this.props;
        return (
            <Container maxWidth="sm" className={classes.container}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                    </Typography>
                <TextField
                    id="outlined-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    type={'text'}
                    label="username"
                    required
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                />
                <TextField
                    id="outlined-adornment-password"
                    required
                    fullWidth
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    autoComplete="false"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={(e) => this.handleClickShowPassword()}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button onClick={(e) => { if (this.props.signIn !== undefined) { this.props.signIn(this.state.username, this.state.password) } }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Sign In</Button>
                <Link to='/signup'>
                    <Typography component="h1" variant="h6">
                        Sign Up Now!
                      </Typography>
                </Link>
            </Container>
        )
    };
}

export default withRouter(withAuth(withStyles(styles)(SignIn)));
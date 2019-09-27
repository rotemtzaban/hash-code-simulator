import {
    TextField,
    WithStyles,
    InputAdornment,
    IconButton,
    withStyles,
    Container,
    Avatar,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';
import React from 'react';
import styles from './styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import withAuth from '../AuthManager/AuthProvider';
import { AuthComponenetProps } from '../AuthManager/AuthProvider';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

interface State {
    password: string;
    username: string;
    showPassword: boolean;
    isLoading: boolean;
    isValidPassword: boolean;
    passwordErrorMsg: string;
    rePassword: string;
    isPasswordMatch: boolean;
}

interface Props
    extends WithStyles<typeof styles>,
        AuthComponenetProps,
        RouteComponentProps<any> {}

class SignIn extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            showPassword: false,
            isLoading: false,
            isValidPassword: true,
            passwordErrorMsg: '',
            isPasswordMatch: true,
            rePassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.isLoggedIn) {
            newProps.history.push('/');
            return;
        }
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({ ...this.state, [prop]: event.target.value }, () => {
            if (
                this.state.password.length > 0 &&
                this.state.password.length < 8
            ) {
                this.setState({
                    isValidPassword: false,
                    passwordErrorMsg: 'password must be at least 8 chars long'
                });
            } else {
                this.setState({ isValidPassword: true, passwordErrorMsg: '' });
            }

            console.log('password:' + this.state.password);
            console.log('repassword:' + this.state.rePassword);

            if (
                this.state.rePassword.length > 0 &&
                this.state.rePassword !== this.state.password
            ) {
                this.setState({ isPasswordMatch: false });
            } else {
                this.setState({ isPasswordMatch: true });
            }
        });
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    onSignClick = async (e: any) => {
        if (this.props.signIn !== undefined) {
            this.setState({ isLoading: true });
            await this.props.signIn(this.state.username, this.state.password);
            this.setState({ isLoading: false });
        }
    };

    render() {
        let { classes } = this.props;
        return (
            <Container maxWidth="sm" className={classes.container}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <TextField
                    id="outlined-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    type={'text'}
                    label="username"
                    required
                    disabled={this.state.isLoading}
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                />
                <TextField
                    id="outlined-adornment-password"
                    error={!this.state.isValidPassword}
                    required
                    fullWidth
                    disabled={this.state.isLoading}
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
                                    onClick={e =>
                                        this.handleClickShowPassword()
                                    }
                                >
                                    {this.state.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {!this.state.isValidPassword && (
                    <Typography className={classes.errormsg}>
                        {this.state.passwordErrorMsg}
                    </Typography>
                )}
                <TextField
                    id="outlined-adornment-password"
                    error={!this.state.isPasswordMatch && this.state.isValidPassword}
                    required
                    fullWidth
                    disabled={this.state.isLoading}
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Verify Password"
                    value={this.state.rePassword}
                    onChange={this.handleChange('rePassword')}
                    autoComplete="false"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={e =>
                                        this.handleClickShowPassword()
                                    }
                                >
                                    {this.state.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {(!this.state.isPasswordMatch && this.state.isValidPassword) && (
                    <Typography className={classes.errormsg}>
                        {'Passwords not match'}
                    </Typography>
                )}
                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onSignClick}
                        type="submit"
                        fullWidth
                        className={classes.submit}
                        disabled={this.state.isLoading}
                    >
                        Sign Up
                    </Button>
                    {this.state.isLoading && (
                        <CircularProgress
                            size={26}
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </Container>
        );
    }
}

export default withRouter(withAuth(withStyles(styles)(SignIn)));

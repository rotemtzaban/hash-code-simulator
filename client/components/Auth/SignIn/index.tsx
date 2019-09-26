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
import LockOpenOutlined from '@material-ui/icons/LockRounded';
import withAuth from '../AuthManager/AuthProvider';
import { AuthComponenetProps } from '../AuthManager/AuthProvider';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';

interface State {
    password: string;
    username: string;
    showPassword: boolean;
    isLoading: boolean;
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
            isLoading: false
        };
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
        this.setState({ ...this.state, [prop]: event.target.value });
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
                    Sign In
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
                        Sign In
                    </Button>
                    {this.state.isLoading && (
                        <CircularProgress
                            size={26}
                            className={classes.buttonProgress}
                        />
                    )}
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onSignClick}
                            type="submit"
                            fullWidth
                            className={classes.signup}
                            disabled={this.state.isLoading}
                        >
                            Sign Up Now!
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }
}

export default withRouter(withAuth(withStyles(styles)(SignIn)));

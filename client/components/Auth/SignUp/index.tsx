import { WithStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ChangeEvent, ReactNode } from 'react';
import styles from './styles';
import Select from '@material-ui/core/Select';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import withAuth from '../AuthManager/AuthProvider';
import { AuthComponenetProps } from '../AuthManager/AuthProvider';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';
import DataFetcher from '../../../dataFetcher';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

interface State {
    password: string;
    username: string;
    showPassword: boolean;
    isLoading: boolean;
    isValidPassword: boolean;
    passwordErrorMsg: string;
    rePassword: string;
    isPasswordMatch: boolean;
    team: string;
    createTeam: boolean;
    selectTeam: string;
    errorMsg: string;
    teams: string[];
}

interface Props
    extends WithStyles<typeof styles>,
    AuthComponenetProps,
    RouteComponentProps<any> { }

class SignUp extends React.Component<Props, State> {
    //TODO : validate all fields ( team files is not empty)
    // validate that the newely created team is not already exsits
    constructor(props: Props) {
        super(props);
        this.state = {
            teams: [],
            errorMsg: '',
            createTeam: false,
            password: '',
            username: '',
            showPassword: false,
            isLoading: false,
            isValidPassword: true,
            passwordErrorMsg: '',
            isPasswordMatch: true,
            rePassword: '',
            selectTeam: '',
            team: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.isLoggedIn) {
            newProps.history.push('/');
            return;
        }
    }

    async componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/');
        }
        
        const teams =  await DataFetcher.GetAllTeams() as string[];
        this.setState({teams})
    }

    onTeamSelected = (event: ChangeEvent<{ name?: string; value: unknown; }>, child: ReactNode) => {
        const selectValue = event.target.value as string;
        if (selectValue === 'create') {
            this.setState({ createTeam: true, team: '', selectTeam: selectValue });
        }
        else {
            this.setState({ createTeam: false, team: selectValue, selectTeam: selectValue });
        }
    };

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
        if (
            !this.state.isValidPassword ||
            !this.state.isPasswordMatch ||
            this.state.password.length === 0
        ) {
            return;
        }

        if (this.props.signUp !== undefined) {
            this.setState({ isLoading: true });
            await this.props.signUp({ username: this.state.username, password: this.state.password, team: this.state.team });
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
                    label="Username"
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
                    error={
                        !this.state.isPasswordMatch &&
                        this.state.isValidPassword
                    }
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
                {!this.state.isPasswordMatch && this.state.isValidPassword && (
                    <Typography className={classes.errormsg}>
                        {'Passwords not match'}
                    </Typography>
                )}

                <FormControl
                    variant="filled"
                    fullWidth
                    className={clsx(
                        classes.margin,
                        classes.textField,
                        classes.formControl
                    )}
                >
                    <InputLabel htmlFor="filled-age-simple">Team</InputLabel>
                    <Select
                        onChange={this.onTeamSelected}
                        value={this.state.selectTeam}
                        fullWidth
                        required
                        disabled={this.state.isLoading}
                        variant="outlined"
                        inputProps={{
                            name: 'team',
                            id: 'filled-age-simple'
                        }}
                    >
                        <MenuItem value="create">
                            <em>Create</em>
                        </MenuItem>
                        {this.state.teams.map(_ => 
                        <MenuItem key={_} value={_}>{_}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                {this.state.createTeam
                    &&
                    <TextField
                        id="outlined-adornment-team"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        type={'text'}
                        label="Team"
                        required
                        disabled={this.state.isLoading}
                        fullWidth
                        value={this.state.team}
                        onChange={this.handleChange('team')}
                    />
                }
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

export default withRouter(withAuth(withStyles(styles)(SignUp)));
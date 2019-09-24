import { TextField, WithStyles, InputAdornment, IconButton, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./styles"
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface State {
    password: string;
    username: string;
    showPassword: boolean;
}

interface Props extends WithStyles<typeof styles> {
}

class SignUp extends React.Component<Props, State>
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

    handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };

    render() {
        let { classes } = this.props;
        return (
            <TextField
                id="outlined-adornment-password"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        )
    };
}

export default withStyles(styles)(SignUp);

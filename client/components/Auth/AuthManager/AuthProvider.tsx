import AuthManager from './AuthManager';
import React, { MouseEventHandler, Mixin } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import IFetchRsult from '../../Models/FetchResult';
import SnackbarContent from '../../SnackbarContent';
import { Snackbar } from '@material-ui/core';
import User from '../../Models/User';

export interface AuthComponenetProps {
    isLoggedIn?: boolean;
    user?: User;
    signIn?: (username: string, password: string, fallbackUrl?: string) => Promise<IFetchRsult>;
    signUp?: (user: User & { password: string }) => Promise<IFetchRsult>;
}

interface AuthState {
    isLoggedIn: boolean;
    user?: User | undefined;
    isSnackbarOpen: boolean;
    snackBarErrorMsg: string;
}

function withAuth<T extends AuthComponenetProps>(
    Component: React.ComponentType<T>
) {
    return class extends React.Component<
        T & RouteComponentProps<any>,
        AuthState
        > {
        constructor(props: T & RouteComponentProps<any>) {
            super(props);
            this.state = {
                isLoggedIn: AuthManager.isLoggedIn,
                user: AuthManager.getProfile(),
                isSnackbarOpen: false,
                snackBarErrorMsg: ''
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            //TODO: remove this use, its deprecated
            AuthManager.addChangeListner(this.handleChange);
        }

        componentWillUnmount() {
            //TODO: remove listner
            AuthManager.removeChangeListner(this.handleChange);
        }

        handleChange() {
            console.log(AuthManager.isLoggedIn);
            let profile = AuthManager.getProfile();
            let user = profile === undefined ? '' : profile.username;
            this.setState({
                isLoggedIn: AuthManager.isLoggedIn,
                user: AuthManager.getProfile()
            });
        }

        signIn = async (
            username: string,
            password: string,
            fallbaclUrl?: string
        ) => {
            var fetchResult: IFetchRsult = await AuthManager.signIn(
                username,
                password
            );
            if (fetchResult.isSuccessfull) {
                if (
                    fallbaclUrl !== undefined &&
                    fallbaclUrl !== null &&
                    fallbaclUrl !== ''
                ) {
                    this.props.history.push('/' + fallbaclUrl);
                    return;
                }

                this.props.history.push('/');
            } else {
                this.setState({
                    isSnackbarOpen: true,
                    snackBarErrorMsg: fetchResult.errorMsg as string
                });
            }
        };

        signUp = async (
            user: User & { password: string },
            fallbaclUrl?: string
        ) => {
            let fetchResult = await AuthManager.signUp(user);
            if (fetchResult.isSuccessfull) {
                if (
                    fallbaclUrl !== undefined &&
                    fallbaclUrl !== null &&
                    fallbaclUrl !== ''
                ) {
                    this.props.history.push('/' + fallbaclUrl);
                    return;
                }

                this.props.history.push('/');
            } else {
                this.setState({
                    isSnackbarOpen: true,
                    snackBarErrorMsg: fetchResult.errorMsg as string
                });
            }
        };

        onSnackbarClose = () => {
            this.setState({ isSnackbarOpen: false });
        };

        render() {
            return (
                <div>
                    <Component
                        {...(this.props as T)}
                        isLoggedIn={this.state.isLoggedIn}
                        user={this.state.user}
                        signIn={this.signIn}
                        signUp={this.signUp}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={this.state.isSnackbarOpen}
                        autoHideDuration={6000}
                        onClose={this.onSnackbarClose}
                    >
                        <SnackbarContent
                            onClose={this.onSnackbarClose}
                            variant="error"
                            message={this.state.snackBarErrorMsg}
                        />
                    </Snackbar>
                </div>
            );
        }
    };
}

export default withAuth;

import AuthManager from "./AuthManager";
import React, { MouseEventHandler, Mixin } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

export interface AuthComponenetProps {
    isLoggedIn?: boolean;
    user?: string;
    signIn?: (username: string, password: string, fallbackUrl?: string) => any;
    signUp?: (username: string, password: string) => any;
}

interface AuthState {
    isLoggedIn: boolean;
    user?: string;
}

function withAuth<T extends AuthComponenetProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<T & RouteComponentProps<any>, AuthState> {
        constructor(props: T & RouteComponentProps<any>) {
            super(props);
            this.state = {
                isLoggedIn: AuthManager.isLoggedIn
            }

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            AuthManager.addChangeListner(this.handleChange);

        }

        componentWillUnmount() {
            //TODO: remove listner
        }

        handleChange() {
            console.log(AuthManager.isLoggedIn);
            let token = AuthManager.getToken();
            let user = token === undefined ? "" : token.username;
            this.setState({
                isLoggedIn: AuthManager.isLoggedIn,
                user: user
            })
        }

        signIn = async (username: string, password: string, fallbaclUrl?: string) => {
            var isSuccessfull = await AuthManager.signIn(username, password);
            if (isSuccessfull) {
                if (fallbaclUrl !== undefined && fallbaclUrl !== null && fallbaclUrl !== "") {
                    this.props.history.push("/" + fallbaclUrl);
                    return
                }

                this.props.history.push("/");
            }
        }

        signUp = async (username: string, password: string, fallbaclUrl?: string) => {
            var isSuccessfull = await AuthManager.signIn(username, password);
            if (isSuccessfull) {
                if (fallbaclUrl !== undefined && fallbaclUrl !== null && fallbaclUrl !== "") {
                    // this.props.history.push("/" + fallbaclUrl);
                    return
                }

                //this.props.history.push("/signin");
            }
        }

        render() {
            return <Component {...this.props as T}
                isLoggedIn={this.state.isLoggedIn} user={this.state.user}
                signIn={this.signIn}
                signUp={(username: string, password: string) => AuthManager.signUp(username, password)}
            />;
        }
    };
};

export default withAuth;
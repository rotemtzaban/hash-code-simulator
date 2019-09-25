import AuthManager from "./AuthManager";
import React, { MouseEventHandler } from "react";

export interface AuthComponenetProps {
    isLoggedIn: boolean;
    user?: string;
    signIn?: (username: string, password: string) => any;
    signUp?: (username: string, password: string) => any;
}

interface AuthState {
    isLoggedIn: boolean;
    user?: string;
}
export default function withAuth<T extends AuthComponenetProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<Omit<Omit<T, "isLoggedIn">, "tokenData">, AuthState> {
        constructor(props: any) {
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
            let user = token === undefined ? "" : token.userName;
            this.setState({
                isLoggedIn: AuthManager.isLoggedIn,
                user: user
            })
        }

        render() {
            return <Component {...this.props as T}
                isLoggedIn={this.state.isLoggedIn} user={this.state.user}
                signIn={(username: string, password: string) => AuthManager.signIn(username, password)}
                signUn={(username: string, password: string) => AuthManager.signUp(username, password)}
            />;
        }
    };
};
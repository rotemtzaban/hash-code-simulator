import AuthManager from "./AuthManager";
import React, { MouseEventHandler } from "react";
import { Button } from "@material-ui/core";

export interface AuthComponenetProps {
    isLoggedIn: boolean;
    user?: string;
}

interface SignInDetails {
    userName: string;
    password: string;
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
            <Button></Button>
            return <Component {...this.props as T} isLoggedIn={this.state.isLoggedIn} user={this.state.user} signIn={(details: SignInDetails) => AuthManager.signIn(details.userName, details.password)} />;
        }
    };
};
import jwtDecode from 'jwt-decode';
import User from '../../Models/User';
import TokenData from '../../Models/TokenData';
import React, { cloneElement, ReactElement } from 'react';

class Auth {
    user?: User;
    tokenData?: TokenData;
    isLoggedIn: boolean;
    changeListenrs: any[] = [];
    constructor() {
        this.isLoggedIn = false;
        this.getProfile = this.getProfile.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.addChangeListner = this.addChangeListner.bind(this);
        this.notifySignStatusChanged = this.notifySignStatusChanged.bind(this);
    }

    addChangeListner(handleChange: () => void) {
        this.changeListenrs.push(handleChange);
    }

    async signIn(userName: string, password: string) {
        this.isLoggedIn = true;
        this.tokenData = {
            expiresAt: new Date(new Date().getTime() + 60 * 60 * 5),
            userName: userName,
        }

        this.notifySignStatusChanged();
        return true;
        //TODO - implement sign in on server
        // return new Promise((resolve, reject) => {
        //     this.isAuth0 = false;
        //     return axios.post(`${SERVER_URI}/sign-in`, {
        //         email: email,
        //         password: password,
        //     }).then(response => {
        //         if (response.status === 200) {
        //             const { token } = response.data;
        //             if (!token || token === '') {
        //                 this.signOut();
        //                 return reject();
        //             }
        //             this.setSession(token);
        //             return resolve();
        //         }
        //     }).catch(console.log('error signing in'));
        // });
    }

    signUp(userName: string, password: string) {
        //TODO - implement sign up on server
    }

    notifySignStatusChanged() {
        this.changeListenrs.forEach(listner => {
            listner();
        });
    }

    getProfile() {
        return this.user;
    }

    getToken() {
        return this.tokenData;
    }

    isAuthenticated() {
        if (!this.isLoggedIn) return false;

        if (this.tokenData !== null && this.tokenData !== undefined) {
            return new Date().getTime() < this.tokenData.expiresAt.getTime();
        }

        return false;
    }

    silentAuth() {
        return new Promise((resolve, reject) => {
            const token = sessionStorage.getItem('jwtToken');
            if (!token || token === '') {
                reject('login_requird')
                return;
            }
            this.setSession(token);
            resolve();
        });
    }

    signOut() {
        sessionStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
        this.notifySignStatusChanged();
    }

    setSession(token: string) {
        sessionStorage.setItem('jwtToken', token);
        this.tokenData = jwtDecode<TokenData>(token);
        this.isLoggedIn = true;
    }
}

const authClient = new Auth();
export default authClient;
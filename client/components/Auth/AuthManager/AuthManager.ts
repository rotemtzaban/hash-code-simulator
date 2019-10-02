import jwtDecode from 'jwt-decode';
import User from '../../Models/User';
import TokenData from '../../Models/TokenData';

class Auth {
    user?: User;
    tokenData?: TokenData;
    token?: string;
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

        this.silentAuth();
    }

    addChangeListner(handleChange: () => void) {
        this.changeListenrs.push(handleChange);
    }

    removeChangeListner(handleChange: () => void) {
        //TODO: fix - its doesnt remove the listner
        this.changeListenrs.filter(_ => handleChange);
    }

    async signIn(username: string, password: string) {
        try {
            var response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                console.log('error occourd sign in', errorMsg);
                return { isSuccessfull: false, errorMsg };
            }

            const token = await response.json();
            this.setSession(token);
            this.notifySignStatusChanged();

            return { isSuccessfull: true };
        } catch (e) {
            console.log('error occourd sign in');
            return { isSuccessfull: false, errorMsg: 'error occourd sign in' };
        }
    }

    async signUp(user: User & { password: string }) {
        try {
            var response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user
                })
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                console.log('error occourd sign up', errorMsg);

                return { isSuccessfull: false, errorMsg };
            }

            const token = await response.json();
            this.setSession(token);
            this.notifySignStatusChanged();
            return { isSuccessfull: true };
            1;
        } catch (e) {
            console.log('error occourd sign up');
            return { isSuccessfull: false, errorMsg: 'error occourd sign up' };
        }
    }

    notifySignStatusChanged() {
        this.changeListenrs.forEach(listner => {
            listner();
        });
    }

    getProfile() {
        return this.tokenData;
    }

    getToken() {
        return this.token;
    }

    isAuthenticated() {
        if (!this.isLoggedIn) return false;

        if (this.tokenData !== null && this.tokenData !== undefined) {
            return new Date().getTime() < this.tokenData.expiresAt.getTime();
        }

        return false;
    }

    silentAuth() {
        const token = localStorage.getItem('jwtToken');
        if (!token || token === '') {
            return;
        }

        this.setSession(token);
    }

    signOut() {
        localStorage.removeItem('jwtToken');
        this.tokenData = undefined;
        this.token = undefined;
        this.isLoggedIn = false;
        this.notifySignStatusChanged();
    }

    setSession(token: string) {
        localStorage.setItem('jwtToken', token);
        this.token = token;
        this.tokenData = jwtDecode<TokenData>(token);
        if (this.tokenData !== undefined) {
            this.user = { username: this.tokenData.username, team: this.tokenData.team };
        }
        this.isLoggedIn = true;
    }
}

const authClient = new Auth();
export default authClient;

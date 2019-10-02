import AuthManager from '../components/Auth/AuthManager/AuthManager';
import IFetchRsult from '../components/Models/FetchResult';
import TeamResult from '../components/Models/TeamResult';
import { TeamRecord } from '../components/ScoreBoard';

class DataFetcher {
    public async GetTeamResults(year: string): Promise<TeamResult> {
        var result = await this.MakeAuthGetFetchReuquest<TeamResult>('/team/results/' + year);
        return result;
    }

    public async GetScoreboard(): Promise<TeamRecord[]> {
        var result = await this.MakeAuthGetFetchReuquest<TeamRecord[]>('/data/scoreboard');
        return result;
    }


    public async GetAllTeams(): Promise<string[]> {
        const teams = await this.MakeGetFetchReuquest<string[]>("/data/teams");
        return teams;
    }

    public async MakeGetFetchReuquest<TResult>(url: string) {
        return this.MakeFetchReuquest<TResult>(url, false, "GET");
    }

    public async MakeAuthGetFetchReuquest<TResult>(url: string) {
        return this.MakeFetchReuquest<TResult>(url, true, "GET");
    }

    private async MakeFetchReuquest<TResult>(
        url: string,
        isAuth: boolean = false,
        method: string,
        body: any | undefined = undefined
    ): Promise<TResult> {
        const token = AuthManager.getToken();
        if (isAuth && token === undefined) {
            throw new Error("user is not connected");
        }

        let headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }

        if (!isAuth) {
            headers = { 'Content-Type': 'application/json' }
        }

        if (method == "GET") {
            var response = await fetch('/api' + url, {
                method: method,
                headers: headers
            });
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }

            var result = await (response.json() as Promise<TResult>);
            return result;
        }
        else {
            var response = await fetch('/api' + url, {
                method: method,
                headers: headers,
                body: body
            });
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }

            var result = await (response.json() as Promise<TResult>);
            return result;
        }
    }
}

const dataFetcher = new DataFetcher();
export default dataFetcher;

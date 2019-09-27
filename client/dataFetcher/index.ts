import AuthManager from "../components/Auth/AuthManager/AuthManager";
import IFetchRsult from "../components/Models/FetchResult";
import TeamResult from "../components/Models/TeamResult";

class DataFetcher {
    public async GetTeamResults(year: string): Promise<TeamResult | IFetchRsult> {
        var result = await this.MakeAuthFetchReuquest<TeamResult>("/team/results/" + year);
        return result;
    }

    private async MakeAuthFetchReuquest<TResult>(url: string, body?: any): Promise<TeamResult | IFetchRsult> {
        const token = AuthManager.getToken();
        if(token === undefined){
            return {isSuccessfull : false, errorMsg: "user does not connected"};
        }

        var response = await fetch("/api/" + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + AuthManager.getToken()
            },
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return { isSuccessfull: false, errorMsg };
        }

        var result = await (response.json() as Promise<{ data: TResult }>);
        return { ...result, isSuccessfull: true };
    }

    private async MakeUnAuthFetchReuquest<TResult>(url: string, body?: any): Promise<TeamResult | IFetchRsult> {
        var response = await fetch("/api/data" + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            return { isSuccessfull: false, errorMsg };
        }

        var result = await (response.json() as Promise<{ data: TResult }>);
        return { ...result, isSuccessfull: true };
    }
}

const dataFetcher = new DataFetcher();
export default dataFetcher;
import { Response, Request } from "express";
import Team from "../db/ITeamModel";

class DataController {
    public static getAllTeams = async (req: Request, res: Response) => {
        const allTeams = await Team.find();

        return res.json(allTeams.map(_ => _.name));
    }
}

export default DataController;

import { Response, Request } from "express";
import Team from "../db/ITeamModel";
import GameStat from "../db/GameStat";

class DataController {
    public static getAllTeams = async (req: Request, res: Response) => {
        const allTeams = await Team.find().select("name");
        return res.json(allTeams.map(_ => _.name));
    }

    public static getBestScores = async (req: Request, res: Response) => {

        const gameStat = await GameStat.findOne();
        if (!gameStat) {
            return res.status(500).send("Game stat isnot initiallized");
        }

        const isFinished = gameStat.isFinished;
        let projection = "first3HoursBestScore"
        if (isFinished) {
            projection = "bestScore";
        }

        const bestScore = await Team.find().select(`${projection} name`).sort([[`${projection}.totalBestScore`, -1]]);
        if (isFinished) {
            return res.json(bestScore.map(_ => ({ team: _.name, score: _.bestScore.totalBestScore })));
        }
        else {
            return res.json(bestScore.map(_ => ({ team: _.name, score: _.first3HoursBestScore.totalBestScore })));
        }
    }
}

export default DataController;

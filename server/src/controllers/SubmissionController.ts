import { Response, Request } from "express";
import Team, { Submission } from "../db/ITeamModel";
import IUserDetails from "../models/IUserDetails";
import GameStat from "../db/GameStat";

class SubmissionController {
    public static submiteScore = async (req: Request, res: Response) => {
        const user: IUserDetails = res.locals.user as IUserDetails;
        const score: Submission = { a: 100, b: 300, c: 400, d: 600, e: 800 };

        const userTeam = await Team.findOne().where("name", user.team);
        if (userTeam == null) {
            return res.status(500).send("user has no valid team");
        }
        if (score.a > userTeam.bestScore.a) {
            userTeam.bestScore.a = score.a;
        }
        if (score.b > userTeam.bestScore.b) {
            userTeam.bestScore.b = score.b;
        }
        if (score.c > userTeam.bestScore.c) {
            userTeam.bestScore.c = score.c;
        }
        if (score.d > userTeam.bestScore.d) {
            userTeam.bestScore.d = score.d;
        }
        if (score.e > userTeam.bestScore.e) {
            userTeam.bestScore.e = score.e;
        }

        userTeam.submissions.push(score);

        const gamestat = await GameStat.findOne()
        if (gamestat && !gamestat.isLastHour) {
            userTeam.first3HoursBestScore = userTeam.bestScore;
        }

        await userTeam.save();
        return res.status(201).send();
    }
}

export default SubmissionController;

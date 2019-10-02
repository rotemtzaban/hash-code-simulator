import { Response, Request } from "express";
import Team, { Submission } from "../db/ITeamModel";
import IUserDetails from "../models/IUserDetails";

class SubmissionController {
    public static submiteScore = async (req: Request, res: Response) => {
        const user: IUserDetails = res.locals.user as IUserDetails;
        const score: Submission = { a: 100, b: 300, c: 400, d: 600, e: 800 };

        const userTeam = await Team.findOne().where("name", user.team);
        if (userTeam == null) {
            return res.status(500).send("user has no valid team");
        }
        let needToUpdate = false;
        if (score.a > userTeam.bestScore.a) {
            userTeam.bestScore.a = score.a;
            needToUpdate = true;
        }
        if (score.b > userTeam.bestScore.b) {
            userTeam.bestScore.b = score.b;
            needToUpdate = true;
        }
        if (score.c > userTeam.bestScore.c) {
            userTeam.bestScore.c = score.c;
            needToUpdate = true;
        }
        if (score.d > userTeam.bestScore.d) {
            userTeam.bestScore.d = score.d;
            needToUpdate = true;
        }
        if (score.e > userTeam.bestScore.e) {
            userTeam.bestScore.e = score.e;
            needToUpdate = true;
        }

        userTeam.submissions.push(score);
        const first3Hours = true;
        if (first3Hours) {
            userTeam.first3HoursBestScore = userTeam.bestScore;
        }

        await userTeam.save();
        return res.status(201).send();
    }
}

export default SubmissionController;

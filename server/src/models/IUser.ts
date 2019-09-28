import { ITeamModel } from "../db/ITeamModel";
import { ObjectID } from "bson";

interface IUser {
    team: ObjectID | ITeamModel;
    username: string;
}

export default IUser;
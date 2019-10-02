import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { User, IUserModel } from "../db/IUserModel";
import  Team,{ isTeam } from "../db/ITeamModel";
import * as jwtHandler from "../services/auth";
import IUserDetails from "../models/IUserDetails";

class AuthController {
    public static signIn = async (req: Request, res: Response) => {
        const { password, username }: { password: string, username: string } = req.body;

        if (!(username && password)) {
            return res.status(400).send("missing username or password");
        }

        let user: IUserModel | null = null;
        try {
            user = await User.findOne().where("username", username).populate({path: "team",select: "name"});
            if (user === null) {
                return res.status(401).send("username does not exsists");
            }
        } catch (error) {
            return res.status(401).send("an error occourd");
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).send("invalid password");
        }

        if(isTeam(user.team)){
            const userInfo = { team: user.team.name, username: user.username };
            const token = jwtHandler.createToken(userInfo);
            return res.json(token).send();
        }

        return res.status(500).send("invalid team");
    };

    public static signUp = async (req: Request, res: Response) => {
        const reqBody: { user: { password: string } & IUserDetails } = req.body;
        const userDetails = reqBody.user;

        if (!(userDetails.username && userDetails.password)) {
            return res.status(400).send("missing username or password");
        }

        let user: IUserModel | null = null;
        try {
            user = await User.findOne().where("username", userDetails.username);
            if (user !== null) {
                return res.status(401).send("username already exsists");
            }
        } catch (error) {
            return res.status(401).send("error occourd in sign up");
        }

        const hashedPassword = await bcrypt.hash(userDetails.password, 15);

        const team = await Team.findOneAndUpdate({ "name": userDetails.team }, { name: userDetails.team }, { upsert: true, new: true,setDefaultsOnInsert: true });
        if (!team) {
            return res.status(500).send("error occourd in sign up");
        }

        const newUser = new User({ team: team._id, username: userDetails.username, password: hashedPassword });
        var dbUser = await newUser.save();
        
        const userInfo : IUserDetails = { team: userDetails.team, username: dbUser.username };
        const token = jwtHandler.createToken(userInfo);
        return res.json(token).send();
    };
}

export default AuthController;
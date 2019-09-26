import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { User, IUserModel } from "../db/mongodb";
import * as jwtHandler from "../services/auth";

class AuthController {
    public static signIn = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send("missing username or password");
        }

        const passwordAsString = password as string;
        let user: IUserModel | null = null;
        try {
            user = await User.findOne().where("username", username);
            if (user === null) {
                return res.status(401).send("username does not exsists");
            }
        } catch (error) {
            return res.status(401).send("an error occourd");
        }
        if (!await bcrypt.compare(passwordAsString, user.password)) {
            return res.status(401).send("invalid password");
        }

        const token = jwtHandler.createToken(user);
        return res.json(token).send();
    };

    public static signUp = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send("missing username or password");
        }

        const usernameAsString = username as string;
        const passwordAsString = password as string;
        let user: IUserModel | null = null;
        try {
            user = await User.findOne().where("username", username);
            if (user !== null) {
                return res.status(401).send("username already exsists");
            }
        } catch (error) {
            return res.status(401).send("error occourd in sign up");
        }

        const hashedPassword = await bcrypt.hash(passwordAsString, 15);
        const newUser = new User({ username: usernameAsString, password: hashedPassword });
        await newUser.save();

        const token = jwtHandler.createToken(newUser);
        return res.status(201).json(token).send();
    };
}

export default AuthController;
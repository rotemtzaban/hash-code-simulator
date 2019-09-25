import jwt from "jsonwebtoken"
import IUser from "../models/IUser";
import config from "../config/config"
import TokenData from "../models/TokenData";

export function checkToken(token: string | undefined): IUser | null {
    if (token === undefined) {
        return null;
    }

    let jwtPayload;
    try {
        jwtPayload = (jwt.verify(token as string, config.jwtSecret) as TokenData);
        // TODO: do we wanna change email to team ? to ignore ? remove?
        const user: IUser = { username: jwtPayload.username, email: "" };
        return user;
    } catch (error) {
        return null;
    }

    // TODO:what about recreating token when expires? 
    // const {  username } = jwtPayload;
    // const newToken = jwt.sign({ username }, config.jwtSecret, {
    //   expiresIn: "24h"
    // });
    // res.setHeader("token", newToken);
}

export function createToken(user: IUser): string {
    const token = jwt.sign(
        { username: user.username },
        config.jwtSecret,
        { expiresIn: "12h" }
    );

    return token;
}
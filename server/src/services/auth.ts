import jwt from "jsonwebtoken"
import config from "../config/config"
import TokenData from "../models/TokenData";
import IUserDetails from "../models/IUserDetails";

export function checkToken(token: string | undefined): IUserDetails | null {
    if (token === undefined) {
        return null;
    }

    let jwtPayload;
    try {
        jwtPayload = (jwt.verify(token as string, config.jwtSecret) as TokenData);
        // TODO: do we wanna change email to team ? to ignore ? remove?
        const user: IUserDetails = { username: jwtPayload.username , team: jwtPayload.team};
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

export function createToken(user: IUserDetails): string {
    const token = jwt.sign(
        user,
        config.jwtSecret,
        { expiresIn: "12h" }
    );

    return token;
}
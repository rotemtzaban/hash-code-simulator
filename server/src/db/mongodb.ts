import { Schema, Model, model, Document } from "mongoose";
import IUser from "../models/IUser";
export interface IUserModel extends IUser, Document {
    password: string
}

export let UserSchema: Schema = new Schema({
    username: {
        type: String,
        index: true
    },
    password: String
});

// super cool stuf on mongoose! 

// UserSchema.pre("save", function (next) {
//     const now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });
//   UserSchema.methods.fullName = function(): string {
// return (this.firstName.trim() + " " + this.lastName.trim());
//   };

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
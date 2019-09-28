import { Schema, Model, model, Document } from "mongoose";

export interface ITeamModel extends Document{
    name: string;
}

export function isTeam(obj: any) : obj is ITeamModel{
    return (obj && obj.name && typeof obj.name === 'string')
}

export let TeamsSchema: Schema = new Schema({
    name: {
        type: String,
        index: true
    },
});

export const Team: Model<ITeamModel> = model<ITeamModel>("Team", TeamsSchema);
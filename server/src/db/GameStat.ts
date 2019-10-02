import { Schema, Model, model, Document } from "mongoose";
export interface GameStatModel extends Document {
    isLastHour: boolean;
    isFinished: boolean;
}

export let GameStatScheme: Schema = new Schema({
    isLastHour: {
        type: Boolean,
        default: false
    },
    isFinished: {
        type: Boolean,
        default: false
    },
});

const GameStat: Model<GameStatModel> = model<GameStatModel>("GameStat", GameStatScheme);
export default GameStat;

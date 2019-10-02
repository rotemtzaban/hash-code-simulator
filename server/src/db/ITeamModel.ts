import { Schema, Model, model, Document } from "mongoose";

export interface ITeamModel extends Document {
    name: string;
    bestScore: { totalBestScore: number } & Submission;
    first3HoursBestScore: { totalBestScore: number } & Submission;
    submissions: Submission[];
}

export interface Submission {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
}

export function isTeam(obj: any): obj is ITeamModel {
    return (obj && obj.name && typeof obj.name === 'string')
}

export let TeamsSchema: Schema<ITeamModel> = new Schema<ITeamModel>({
    name: {
        type: String,
        index: true
    },
    bestScore: {
        a: {
            type: Number,
            default: 0
        },
        b: {
            type: Number,
            default: 0
        },
        c: {
            type: Number,
            default: 0
        },
        d: {
            type: Number,
            default: 0
        },
        e: {
            type: Number,
            default: 0
        },
        totalBestScore: {
            type: Number,
            default: 0,
            index: true
        }
    },
    first3HoursBestScore: {
        a: {
            type: Number,
            default: 0
        },
        b: {
            type: Number,
            default: 0
        },
        c: {
            type: Number,
            default: 0
        },
        d: {
            type: Number,
            default: 0
        },
        e: {
            type: Number,
            default: 0
        },
        totalBestScore: {
            type: Number,
            default: 0, 
            index: true
        }
    },
    submissions: [
        {
            a: Number,
            b: Number,
            c: Number,
            d: Number,
            e: Number,
            submissionTime: {
                type: Date,
                default: Date.now
            },
            default: []
        }
    ]
});

TeamsSchema
    .pre('save', function (this: ITeamModel, next) {
        this.bestScore.totalBestScore =
            this.bestScore.a + this.bestScore.b + this.bestScore.c + this.bestScore.d + this.bestScore.e;

        this.first3HoursBestScore.totalBestScore =
            this.first3HoursBestScore.a + this.first3HoursBestScore.b + this.first3HoursBestScore.c + this.first3HoursBestScore.d + this.first3HoursBestScore.e;
        next();
    });
const Team: Model<ITeamModel> = model<ITeamModel>("Team", TeamsSchema);
export default Team;
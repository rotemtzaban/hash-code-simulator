interface QuestionResult {
    inputName: string;
    inputId : number;
    score: number;
}

export interface Submission {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
}

export default interface TeamResult {
    topScore: Submission;
    submissions : Submission[]
}
interface QuestionResult {
    inputName: string;
    inputId : number;
    score: number;
}

export default interface TeamResult {
    year: string;
    inputScores : QuestionResult[]
}
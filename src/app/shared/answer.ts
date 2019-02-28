import Author from "./author";

export default class Answer {
    Id: string;
    Question_Id: string;
    Answer:string;
    created_at:string;
    created_by:Author;
    downvotes: number;
    upvotes: number;
}

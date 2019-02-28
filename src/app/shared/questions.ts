import Question from "./question"

//The Customer class is a user-defined type that makes use of built-in TypeScript types like number and string to define a model.

export default class Questions {
    Id: String;
    Text: String;
    downVotes: number;
    upVotes: number;
    questions: Array<Question>;
}

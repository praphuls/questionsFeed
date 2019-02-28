/**
 * Author: Praphul Sinha
 * 
 * show-questions-feed Component
 * This is the list component, which shows the questions-feed fetched from the API.
 * 
 */

/**
 * Required Imports
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppServicesService } from "./../../../services/app-services.service";
import FeedQuestions from "../../../shared/questions";
import Answer from './../../../shared/answer';
import Author from './../../../shared/author';

/**
 * Component Decorator Defination
 */
@Component({
  selector: 'app-show-questions-feed',
  templateUrl: './show-questions-feed.component.html',
  styleUrls: ['./show-questions-feed.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

/**
 * Component Class Defination
 * 
 * Implments OnInit Interface
 */
export class ShowQuestionsFeedComponent implements OnInit {
/**
 * Component Class Properties
*/
  questions: Array<FeedQuestions>;
  answers: Array<Answer>;
  upVoteValue: Number = 0;
  downVoteValue: Number = 0;
  str: string;
  answer: Answer;
  name: any;
  author: Author;
  quesId: Number;
  ansId: String;

/**
 * Constructor function
*/
  constructor(
    private questionsService: AppServicesService
  ) {}

/** 
  * ngOnInit: Component life cycle hook
  * 
  * OnInit Interface implementation method
 */
  ngOnInit() {
    this.getQuestions();
    this.getAnswers();
    console.log(document.getElementById("ansText"));
  }

/**
 * getQuestions: Function that calls the Service appService to fetch the questions
 * 
 * Uses observable
*/
  getQuestions() {
    let obsvr = this.questionsService.getQuestions();
    obsvr.subscribe((data)=> {
      this.questions = data.feed_questions;
      this.questionsService.questions = data.feed_questions;
      console.log("Questions: ", this.questions);
    });
  }

/**
 * getAnswers: Function that calls the Service appService to fetch the answers
 * 
 * Uses observable
*/
  getAnswers() {
    let obsvr = this.questionsService.getAnswers();
    obsvr.subscribe((data)=> {
      this.answers = data.feed_answers;
      this.questionsService.answers = data.feed_answers;
      console.log("Answers: ", this.answers);
    });
  }

/**
 * getName: Function that return the name of the author of the answer that needs to be shown
 * 
 * arguments: <answer> object
 * 
 * return: any
 * 
*/
  getName(answer): any {
    let name: String;
    if(answer.created_by !== undefined && answer.created_by !== null){
      if(typeof answer.created_by === "object"){
        name = answer.created_by.Name + " " + answer.created_by.Surname;
      }else{
        name = "Anonymous";
      }
    }else{
      name = "Anonymous";
    }
    return name;
  }

/**
 * getProfileImage: Function that return the profile image of the author of the answer that needs to be shown
 * 
 * arguments: <answer> object
 * 
 * return: any
 * 
*/
  getProfileImage(answer): any {
    let imgUrl:String;
    if(answer.created_by !== undefined){
      if(answer.created_by.Avatar !== undefined && answer.created_by.Avatar !== null){
        imgUrl = answer.created_by.Avatar;
      }else{
        imgUrl = "assets/profile.png";
      }
    }else{
      imgUrl = "assets/profile.png";
    }
    return imgUrl;
  }

/**
 * onUpVote: Function that increases the votes
 * 
 * arguments: answer index
 * 
*/
  onUpVote(index) {
    let answer = this.answers.filter(ans => (ans["Id"] === index["Id"]) && (ans["Question-Id"] === index["Question-Id"]))
    let question = this.questions.filter(ques => ques["Id"] === index["Question-Id"])
    let votes;
    let totalVotes;
    if (answer[0]["upvotes"] !== null && answer[0]["upvotes"] !== undefined){
      votes = answer[0]["upvotes"];
    }
    else{
      votes = 0;
    }
    if (question[0]["upvotes"] !== null && question[0]["upvotes"] !== undefined){
      totalVotes = question[0]["upvotes"];
    }
    else{
      totalVotes = 0;
    }
    answer[0]["upvotes"] = Number(votes) + 1;
    question[0]["upvotes"] = Number(totalVotes) + 1;
  }

/**
 * onDownVote: Function that increases the votes
 * 
 * arguments: answer index
 * 
*/
  onDownVote(index) {
    let answer = this.answers.filter(ans => (ans["Id"] === index["Id"]) && (ans["Question-Id"] === index["Question-Id"]))
    let question = this.questions.filter(ques => ques["Id"] === index["Question-Id"])
    let votes;
    let totalVotes;
    if (answer[0]["downvotes"] !== null && answer[0]["downvotes"] !== undefined){
      votes = answer[0]["downvotes"];
    }
    else{
      votes = 0;
    }
    if (question[0]["downvotes"] !== null && question[0]["downvotes"] !== undefined){
      totalVotes = question[0]["downvotes"];
    }
    else{
      totalVotes = 0;
    }

    answer[0]["downvotes"] = Number(votes) - 1;
    question[0]["downvotes"] = Number(totalVotes) - 1;
  }

  handleClick($event) {
    $event.target.placeholder = " ";
  }
}

/**
 * Author: Praphul Sinha
 * 
 * show-question Component
 * This is the detail component of questions-feed component.
 * 
 */

/**
 * Required Imports
 */
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AppServicesService } from "./../../../services/app-services.service";
import Questions from "../../../shared/questions";
import Answer from './../../../shared/answer';
import Question from './../../../shared/question';
import * as moment from 'moment';
import Author from './../../../shared/author';
import { Utility } from "./../../../utility/utility";

/**
 * Component Decorator Defination
 */
@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})

/**
 * Component Class Defination
 * 
 * Implments OnInit Interface
 */
export class ShowQuestionComponent implements OnInit {

/**
 * Component Class Properties
*/
  questions: Array<Questions>;
  answers: Array<Answer>;
  str: string;
  answer: Answer;
  question: Question;
  name: any;
  author: Author;
  quesId: Number;
  ansId: String;
  paramId:Number;
  utils:Utility;
  ques$: any;
  ans$:any;
  isDataAvailable: boolean = false;
  addedAnswer: Array<Answer>;

/**
 * Constructor function
*/
  constructor(
    private route: ActivatedRoute, 
    private appService: AppServicesService,
    private cdr: ChangeDetectorRef,
    private zone:NgZone
  ) { }

/**
 * ngOnInit: Component life cycle hook
 * 
 * OnInit Interface implementation method
*/
  ngOnInit() {
   this.isDataAvailable = false;
   this.getQuestions();
   this.getAnswers();
   this.paramId = Number(this.route.snapshot.paramMap.get("id"));
  }

/**
 * getQuestions: Function that calls the Service appService to fetch the questions
 * 
 * Uses observable
*/
  getQuestions() {
    let obsvr = this.appService.getQuestions();
    obsvr.subscribe((data)=> {
      this.questions = data.feed_questions;
      this.fillQuestions();
    });
  }

/**
 * getAnswers: Function that calls the Service appService to fetch the answers
 * 
 * Uses observable
*/
  getAnswers() {
    let obsvr = this.appService.getAnswers();
    obsvr.subscribe((data)=> {
      this.answers = new Array(); 
      this.answers = data.feed_answers;
    });
    setTimeout(() => {
      this.isDataAvailable = true;
    }, 2000);
  }

/**
 * fillQuestions: Function that fetches the paramId and filters the question that need to be rendered
*/
  fillQuestions() {
    this.question = this.questions.filter(ques => ques["Id"] === ('Q-'+ (+this.paramId)))[0];
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

/**
 * getRandomNames: Function that fetches the random name from external API and 
 * creates the 'created_by' object inside <answer> object
 * 
 * arguments: gender string
 * 
 * Uses observable
*/
  getRandomNames(gender: String): any {
    let obsvr = this.appService.getRandomName();
    obsvr.subscribe((data)=> {
      this.name = data;
      this.setAuthorName(this.name["results"][0]);
    });
  }

/**
  * setAuthorName: creates the <author> object and assign the 
  * creates the 'created_by' object inside <answer> object
  * 
  * arguments: name
 */
  setAuthorName(name:any) {
    this.author = new Author();
    let utils = new Utility();
    if(name !== null && name !== undefined){
      this.author["Id"] = "Person-1";
      this.author["Name"] = utils.upperCasefirst(name.name.first);
      this.author["Surname"] = utils.upperCasefirst(name.name.last);
      this.author["Avatar"] = name.picture.thumbnail;
     }
     this.createAnswer();
  }

/**
  * createAnswer: creates the <answer> object and puts it in the answers array on the top
  * 
  * arguments: none
 */
  createAnswer() {
    if(this.answer !== null || this.answer !== undefined){
      this.answer = null;
    }
    let ansId = +this.ansId + 1;
    this.answer = new Answer();
    this.answer = { 
        Id: "A-"+ansId,
        Question_Id: "Q-"+this.quesId,
        Answer: this.str,
        created_at: moment(new Date()).format('DD/MMM/YY HH:MM').toString(),
        created_by: this.author,
        downvotes: 0,
        upvotes: 0
    }
    this.answers.unshift(this.answer);
    this.zone.run(() => console.log("zone run"))
  }

/**
  * addAnswer: caleed when add answer button is clicked
  * 
  * arguments: question
 */
  addAnswer(question) {
    let answers = this.answers.filter(ans => (ans["Question-Id"] === question["Id"]));
    this.quesId = question["Id"].split("-")[1];
    this.ansId = answers[answers.length-1]["Id"].split("-")[1];
    let utils = new Utility();
    let name= this.getRandomNames(utils.getRandomGender());
  }

}

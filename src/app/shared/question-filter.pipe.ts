/**
 * Author: Praphul Sinha
 * 
 * Name: QuestionFilterPipe
 * 
 */

/**
 * Required Imports
 */
import { Pipe, PipeTransform } from '@angular/core';
import Answer from "./answer";

@Pipe({
  name: 'questionFilter',
  pure: false
})
export class QuestionFilterPipe implements PipeTransform {
  transform(answersArray: Array<Answer>, questionId: string): any {
    let array:Array<any>;
    if(answersArray !== undefined){
      array = answersArray.filter(answer => answer["Question-Id"] === questionId);
    }
   // console.log(array)
    if(array !== undefined)
      return array.sort((a, b) => a["created_at"] - b["created_at"]);
  }
}

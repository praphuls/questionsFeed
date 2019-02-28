/**
 * Author: Praphul Sinha
 * 
 * Service: app-services
 * This is the list component, which shows the questions-feed fetched from the API.
 * 
 */

/**
 * Required Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConfigs } from "./../settings/app-configs";
 
/**
 * Injectable Decorator Defination
 */
@Injectable({
  providedIn: 'root'
})

/**
 * 
 * Service Class Defination
 * 
 */
export class AppServicesService {
/**
 * Class Properties
 * 
 * Declare the variable for RESTful API endpoint
*/

  feedAnswersEndpoint = AppConfigs.FEED_ANSWERS_URL;
  feedQuestionsEndpoint = AppConfigs.FEED_QUESTIONS_URL;
  nameEndpoint = AppConfigs.NAME_URL;
  public questions: any;
  public answers: any;

  // Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) {}

  // Declare the HTTP headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

/**
 * getQuestions: Function that fetches the questions from feedQuestionsEndpoint
 * 
 * return: Observable<any>
*/
  getQuestions (): Observable<any> {
    return this.http.get(this.feedQuestionsEndpoint);
    
  }

/**
 * getAnswers: Function that fetches the answers from feedAnswersEndpoint
 * 
 * return: Observable<any>
*/
  getAnswers (): Observable<any> {
    return this.http.get(this.feedAnswersEndpoint);
  }

/**
 * getRandomName: Function that fetches the random names from nameEndpoint
 * 
 * return: Observable<any>
*/
  getRandomName (): Observable<any>   {
    return this.http.get(this.nameEndpoint);
  }
}

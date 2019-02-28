/**
 * Author: Praphul Sinha
 * 
 * Name: Utility
 * 
 */
export class Utility {
/**
 * getRandomGender: Function that return random gender
 * 
*/
    getRandomGender(): any {
        let gender: String;
        let genderId:Number = this.getRandomNumber(1,2);
        if(genderId === 1){
            gender = "female";
        }else{
            gender = "male";
        }
    }

/**
 * getRandomNumber: Function that return random number
 * 
*/
    getRandomNumber(a, b): Number {
        let min = a; 
        let max = b;  
        const random = Math.random() * (+max - +min) + +min;
        return Math.floor(random);
    }
/**
 * getRandomGender: Function that string with title case
 * 
*/
    upperCasefirst(string): any {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
}

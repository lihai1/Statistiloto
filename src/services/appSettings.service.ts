/**
 * Created by LihaiMac on 5/30/17.
 */

import {Injectable} from '@angular/core'
import {Platform} from "ionic-angular/index";
@Injectable()
export class AppSettings {
  API_ENDPOINT:string;
  API_COMPUTING:string;
  API_USER:string;
  API_GERENRATE_FORMS:string;
  API_GERENRATE_STATISTICS:string;
  API_ANALYZE_NUMBERS:string;
  API_USER_SAVE:string;
  API_USER_GET_NUMBERS;

  constructor(platform:Platform) {
    platform.ready().then(() => {
      if (platform.is('core')) {
        this.API_ENDPOINT = 'http://localhost:8080/';
      }
      else {
        this.API_ENDPOINT = 'http://statistiloto1.herokuapp.com/';
      }
      this.API_COMPUTING = this.API_ENDPOINT+'generate/';
      this.API_USER = this.API_ENDPOINT+'user/';
      this.API_GERENRATE_FORMS = this.API_COMPUTING+'form';
      this.API_GERENRATE_STATISTICS = this.API_COMPUTING+'pares';
      this.API_ANALYZE_NUMBERS = this.API_COMPUTING+'analyze';
      this.API_USER_GET_NUMBERS = this.API_USER+'getUserNumbers';
      this.API_USER_SAVE = this.API_USER+'addUserNumbers';

    });
  }
}

export class NumbersCategory {
  static API_USER_LUCKY:string = "luck";
  static API_USER_FORM:string = "user-generated";
  static API_USER_GROUP:string = "group-calculated";

  static getCategories():string[]{
    var rs=[];
    for(var e in NumbersCategory){
        rs.push(NumbersCategory[e]);
    }
    // remove method preperty
    rs.shift();
    return rs;
  }
}

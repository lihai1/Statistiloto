import { Component } from '@angular/core';
import {AuthService, User} from "../../services/auth.service";
import {userData} from "../../services/user.service";
import {UserNumbers} from "../../services/models/UserNumbers";
import {NumbersCategory} from "../../services/appSettings.service";
import {NumbersCategoryPipe} from "../../pipes/numbers-category/numbers-category";


@Component({
  selector: 'page-user-numbers',
  templateUrl: 'numbers.html',
  providers:[NumbersCategoryPipe]
})
export class userFormsPage {
  forms:UserNumbers[];
  numbers:UserNumbers[];
  lucky:UserNumbers[];
  userData:User;


  constructor(private user:userData,
              private auth: AuthService,
              private categoryPipe: NumbersCategoryPipe) {
    this.userData = auth.getUser();

    /* user.getSavedForms().then(data =>{
     this.forms=data;
     });
     user.getSavedNumbers().then(data =>{
     this.forms=data;
     });*/
    if(this.userData!=undefined){
      var nums:UserNumbers[] = this.userData.numbers;
      this.sortUserNumbers(nums);
    }
    this.lucky=user.getBuild();
    this.forms = user.getForms();
    this.numbers = user.getNumbers();
  }

  private sortUserNumbers(nums:UserNumbers[]){
    var filtered:UserNumbers[][] = this.categoryPipe.transform(nums);
    this.user.addToBuild(filtered[0]);
    this.user.addFormData(filtered[1]);
    this.user.addSetData(filtered[2]);
  }

}



// WEBPACK FOOTER //
// ./src/pages/user/numbers.ts

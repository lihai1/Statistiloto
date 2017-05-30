import { Component } from '@angular/core';
import {userData, numberData} from "../../services/user.service";
import {AuthService, User} from "../../services/auth.service";


@Component({
  selector: 'page-user-numbers',
  templateUrl: 'numbers.html',
})
export class userFormsPage {
  forms:numberData[];
  numbers:numberData[];
  lucky:numberData[];
  userData:User;
  constructor(private user:userData,private auth: AuthService) {
    this.userData = auth.getUser();

   /* user.getSavedForms().then(data =>{
      this.forms=data;
    });
    user.getSavedNumbers().then(data =>{
      this.forms=data;
    });*/
    this.lucky=user.getBuild();
    this.forms = user.getForms();
    this.numbers = user.getNumbers();
    this.userData = this.auth.getUser();
  }


}

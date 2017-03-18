import { Component } from '@angular/core';

import {userData, numberData} from '../../services/user.service';

@Component({
  selector: 'page-user-numbers',
  templateUrl: 'numbers.html',
})
export class userFormsPage {
  forms:numberData[];
  numbers:numberData[];
  lucky:numberData[];
  user:Object;
  constructor(user:userData) {
    this.user = user;

   /* user.getSavedForms().then(data =>{
      this.forms=data;
    });
    user.getSavedNumbers().then(data =>{
      this.forms=data;
    });*/
    this.lucky=user.getBuild();
    this.forms = user.getForms();
    this.numbers = user.getNumbers();
  }


}

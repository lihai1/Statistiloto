import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {userData} from '../../services/user.service';

@Component({
  selector: 'page-user-numbers',
  templateUrl: 'numbers.html',
})
export class userFormsPage {
  forms:number[][];
  numbers:number[][];
  user:Object;
  constructor(public navCtrl: NavController,user:userData) {
    this.user = user;

    user.getSavedForms().then(data =>{
      this.forms=data;
    });
    user.getSavedNumbers().then(data =>{
      this.forms=data;
    });
    this.forms = user.getForms();
    this.numbers = user.getNumbers();
  }
  

}

import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LotteryApi} from "../../services/lottery.service";
import {userData} from "../../services/user.service";


@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  formType:number = 6;
  pares:number = 1;
  paresRes:any;
  formsRes:any;
  systems:number[]=[6,7,8,9,10,11,12];


  constructor(public navCtrl:NavController, private lotteryApi:LotteryApi,private user:userData) {
    this.user = user;
   // this.calcStatistics(2, 5);
  }

  paresChange(event){
    this.calcStatistics(this.pares, 5);
  }

  calcStatistics(type, howMany) {
    this.lotteryApi.getNewPares(type, howMany).subscribe(data => {
      debugger;
      console.log('calculated stats!!');
      console.log(data);
      this.paresRes = data;
    });
  }

}

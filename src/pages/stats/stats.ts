import {Component, Input} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
import {userData} from '../../services/user.service';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
  providers: [LotteryApi],
  // directives: [LotteryList]
})
export class StatsPage {
  formType:number = 6;
  pares:number = 1;
  paresRes:any;
  formsRes:any;
  systems:number[]=[6,7,8,9,10,11,12];
  //@Input() choices:string[];


  constructor(public navCtrl:NavController, private lotteryApi:LotteryApi,private user:userData) {
    this.user = user;
    this.generateNewForms(8, 5);
    this.calcStatistics(2, 5);
  }

  paresChange(event){
    this.calcStatistics(this.pares, 5);
  }
  formsChange(event){
    this.generateNewForms(this.formType, 5);
  }

  generateNewForms(type, howMany) {
    this.lotteryApi.getNewForms(type, howMany).then(data => {
      console.log('generated forms!!');
      console.log(data);
      this.formsRes = data;
    });
  }

  calcStatistics(type, howMany) {
    this.lotteryApi.getNewPares(type, howMany).then(data => {
      console.log('calculated stats!!');
      console.log(data);
      this.paresRes = data;
      this.user.addSetData(data);
    });
  }

}

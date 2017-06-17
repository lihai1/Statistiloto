/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {userData} from "../../services/user.service";
import {LotteryApi} from "../../services/lottery.service";
import {AppTools} from "../../services/appTools.service";
import {UserNumbers} from "../../services/models/UserNumbers";

@Component({
  selector: 'lottery-pares',
  templateUrl: 'lottery-pares.html',
})
export class LotteryPares {
  pares:number = 1;
  choices:number[] = [1, 2, 3, 4, 5, 6];
  paresRes:UserNumbers[] = [];
  strong:string = 'strong';

  constructor(public navCtrl:NavController,
              private lotteryApi:LotteryApi,
              private user:userData,
              private appTools:AppTools) {
  }

  private setParesType(howMany) {
    this.pares = howMany;
  }

  paresChange(event) {
    this.calcStatistics(this.pares, 10);
  }

  presentActionSheet() {
    this.appTools.presentActionSheet(this.choices,
      'גודל הקבוצה',
      type => this.setParesType(type));
  }

  calcStatistics(type_, howMany) {

    this.lotteryApi.getNewPares(type_, howMany, this.strong).subscribe(data => {
      console.log('calculated stats!!');
      console.log(data);
      //debugger;
      this.paresRes = this.user.convertSaved(data);
    });
  }

}


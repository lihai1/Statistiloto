/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
import {userData, numberData} from '../../services/user.service';
import {AppTools} from '../../services/appTools.service';

@Component({
  selector: 'lottery-pares',
  templateUrl: 'lottery-pares.html',
})
export class LotteryPares {
  pares:number = 1;
  choices:number[] = [1, 2, 3, 4, 5, 6];
  paresRes:numberData[] = [];
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

    this.lotteryApi.getNewPares(type_, howMany, this.strong).then(data => {
      console.log('calculated stats!!');
      console.log(data);
      this.paresRes = this.user.convert(data);
    });
  }

}


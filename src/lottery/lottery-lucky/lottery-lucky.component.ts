/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';
import {userData} from '../../services/user.service'
import {appTools} from '../../services/appTools.service'
@Component({
    selector: 'lottery-lucky',
    templateUrl: 'lottery-lucky.html',
})
export class LotteryLucky {
    willBe:number[] = [];
    private choices:number[] = [];

  constructor(private user:userData,
                private appTools:appTools) {
        this.user = user;
        this.appTools=appTools;
        for(var i=1;i<=37;i++){
          this.choices.push(i);
        }
        //this.willBe = user.getBuild();
    }

  addNumber(n:number) {
    this.willBe.push(n);
    // this.formsChange(null);
  }
  addArray(n:number) {
    this.user.addToBuild(this.user.convert([this.willBe]));
    // this.formsChange(null);
  }
  removeNumber(i:number) {
    this.willBe.splice(i,1);
    // this.formsChange(null);
  }



}

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
  private choices:number[];

  constructor(private user:userData,
              private appTools:appTools) {
    this.user = user;
    this.appTools = appTools;
    this.initChoices();
    //this.willBe = user.getBuild();
  }
  private initChoices(){
    this.choices=[];
    for (var i = 1; i <= 37; i++) {
      this.choices.push(i);
    }
    this.willBe=[];
  }
  addNumber(n:number) {
    if(this.willBe.length > 12){
        var options={
          message: "לא ניתן להוסיף יותר מ12 מספרי מזל לטופס - מגבלה של טופס שיטטי",
          duration: 2000,
          position: "bottom",
          showCloseButton:true,
          closeButtonText:"סגור",

        };
    }
    this.willBe.push(n);
    this.choices.splice(this.choices.indexOf(n),1);
    this.willBe = this.willBe.sort((a, b)=>a - b);
    // this.formsChange(null);
  }

  addArray(n:number) {
    this.user.addToBuild(this.user.convert([this.willBe]));
    this.initChoices();
  }

  removeNumber(i:number) {
    this.willBe.splice(i, 1);
    this.choices.push(i);
    this.choices.sort((a,b)=>a-b);

    // this.formsChange(null);
  }


}

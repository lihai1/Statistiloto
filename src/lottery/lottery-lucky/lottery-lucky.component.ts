/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component} from '@angular/core';
import {userData} from "../../services/user.service";
import {AppTools} from "../../services/appTools.service";
import {UserNumbers} from "../../services/models/UserNumbers";
@Component({
  selector: 'lottery-lucky',
  templateUrl: 'lottery-lucky.html',
})
export class LotteryLucky {
  willBe:number[] = [];
  private choices:number[];

  constructor(private user:userData,
              private appTools:AppTools) {
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
    var limit = 8;
    if(this.willBe.length > limit){
        var options={
          message: "לא ניתן להוסיף יותר מ"+limit+" מספרי מזל לטופס - מגבלה של טופס שיטטי",
          duration: 2000,
          position: "bottom",
          showCloseButton:true,
          closeButtonText:"סגור",
        };
      this.appTools.showToast(options);
    }
    else {
      this.willBe.push(n);
      this.choices.splice(this.choices.indexOf(n), 1);
      this.willBe = this.willBe.sort((a, b)=> a - b);
    }
    // this.formsChange(null);
  }

  addArray(n:number) {
    this.user.addToBuild([new UserNumbers(this.willBe)]);
    this.initChoices();
  }

  removeNumber(i:number) {
    this.choices.push(this.willBe[i]);
    this.willBe.splice(i, 1);
    this.choices.sort((a,b)=> a - b);

    // this.formsChange(null);
  }


}

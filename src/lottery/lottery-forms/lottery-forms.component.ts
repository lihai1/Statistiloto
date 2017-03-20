/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component} from '@angular/core';
import {LotteryApi} from '../../services/lottery.service';
import {userData, numberData} from '../../services/user.service'
import {AppTools} from '../../services/appTools.service'
@Component({
  selector: 'lottery-forms',
  templateUrl: 'lottery-forms.html',
})
export class LotteryForms {
  formType:number = 6;
  formsRes:numberData[] = [];
  choices:number[] = [6, 7, 8, 9, 10, 11, 12];
  willBe:number[] = [];

  constructor(private lotteryApi:LotteryApi,
              private user:userData,
              private appTools:AppTools) {
   // this.generateNewForms(this.formType, 5);
    this.user = user;
    this.appTools = appTools;
  }

  setFormType(_type) {
    this.formType = _type;
    // this.formsChange(null);
  }

  formsChange(event) {
    this.generateNewForms(this.formType, 5);
  }

  presentActionSheet() {
    var self = this;
    this.appTools.presentActionSheet(this.choices,
      'בחירת שיטטתי',
      function (type) {
        self.setFormType(type);
      });
  }

  generateNewForms(type1, howMany) {
    var x:numberData[] = this.user.getAllNumbers();
    //var willBe:number[] = [];
    var promise:Promise<number[]>;
    if (x.length > 0) {
      promise=this.appTools.presentArraysActionSheet(x,
        'להוסיף גם את מספרי המזל שלך?',
        type_ =>{
          return type_;
        });
    }
    else {
      promise = new Promise((resolve, reject) => resolve([]));
    }
    promise.then(resolve => {
      this.lotteryApi.getNewForms(type1, howMany, resolve).then(data => {
        console.log('generated forms!!');
        console.log(data);
        this.formsRes = this.user.convert(data);
        //this.formsRes = data;
        // this.user.addFormData(this.formsRes);
      });
    });
  }

}


// WEBPACK FOOTER //
// ./src/lottery/lottery-forms/lottery-forms.component.ts



// WEBPACK FOOTER //
// ./src/lottery/lottery-forms/lottery-forms.component.ts

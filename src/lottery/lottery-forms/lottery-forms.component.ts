/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, ElementRef} from '@angular/core';
import {userData} from "../../services/user.service";
import {LotteryApi} from "../../services/lottery.service";
import {AppTools} from "../../services/appTools.service";
import {SavedNumbers} from "../../services/models/SavedNumbers";
import {UserNumbers} from "../../services/models/UserNumbers";
@Component({
  selector: 'lottery-forms',
  templateUrl: 'lottery-forms.html',
})
export class LotteryForms {
  formType:number = 6;
  formsRes:SavedNumbers[] = [];
  choices:number[] = [6, 7, 8, 9, 10, 11, 12];
  willBe:number[] = [];

  constructor(private myElement:ElementRef,
              private lotteryApi:LotteryApi,
              private user:userData,
              private appTools:AppTools) {
  }

  ngOnInit(){

  }
  setFormType(_type) {
    this.formType = _type;
    // this.formsChange(null);
  }

  formsChange(event) {
    this.generateNewForms(this.formType, 10);
  }

  presentActionSheet() {
    this.appTools.presentActionSheet(
      this.choices,
      'בחירת שיטטתי',
      type => this.setFormType(type)
      );
  }

  animationState:string;
  generateNewForms(type1, howMany) {
    var x:UserNumbers[] = this.user.getAllNumbers();
    //var willBe:number[] = [];
    var promise:Promise<number[]>;
    if (x.length > 0) {
      promise=this.appTools.presentArraysActionSheet(x,
        'להוסיף גם את מספרי המזל שלך?',
        type_ => type_
      )
    }
    else {
      promise = Promise.resolve([]);
    }

    promise.then(resolve => {
      this.lotteryApi.getNewForms(type1, howMany, resolve).subscribe(data => {
        console.log('generated forms!!');
        console.log(data);
        //debugger;
        //this.formsRes = this.user.convert(data);
        this.formsRes = this.user.convertSaved(data);
        this.animationState = "";
        //setTimeout(()=>{
         // var list = document.querySelectorAll(".cover");
        this.animationState = "done";
        //},2000);
        //this.formsRes = data;
        // this.user.addFormData(this.formsRes);
      },error => {});
    });
  }

}


// WEBPACK FOOTER //
// ./src/lottery/lottery-forms/lottery-forms.component.ts


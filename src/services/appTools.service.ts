/**
 * Created by LihaiMac on 2/28/17.
 */
import {ActionSheetController, ToastController} from 'ionic-angular';

import {Injectable} from '@angular/core'
import {UserNumbers} from "./models/UserNumbers";

@Injectable()
export class AppTools {
  constructor(private actionSheet:ActionSheetController,private toastCtrl:ToastController) {
  }
  language:string = 'heb';
  setButtonsJson(arr:any[], itemText:string, callback:Function):any[] {
    let buttons = [];
    let pre = itemText ? itemText : '';
    arr.forEach(function (elem) {
      buttons.push({
        text: pre + " " + elem,
        handler: ()=> {
          callback(elem);
        }
      });
    });
    return buttons;
  }


  presentActionSheet(buttons:any[], inputText:string, tapFunc:Function) {
    let actionSheet = this.actionSheet.create({
      title: 'בחר',
      buttons: this.setButtonsJson(buttons, inputText, tapFunc)
    });
    actionSheet.present();
  }

  setArrayButtonsJson(arr:UserNumbers[], itemText:string, callback:Function,resolve:Function):any[] {
    let buttons = [];
    let pre = itemText ? itemText : '';
    arr.forEach((elem:UserNumbers,index,arr)=> {
      var tmp:string = '';
      //if(elem.numbers) elem=elem.numbers;
      elem.numbers.numbers.forEach((num)=>tmp+=' '+num);
      buttons.push({
        text: pre+' '+tmp,
       // icon:'<lottery-list [data]="[form]" [disabled]="true"></lottery-list>',
        handler: ()=> {
          resolve(callback(elem));
        }
      });
    });
    buttons.push({ // todo fix resolve
      text: "ללא מספרי מזל",
      handler: ()=> {
        resolve([]);
      }
    });
    return buttons;
  }
  presentArraysActionSheet(buttons:any[], title:string, tapFunc:Function) {
    return new Promise(resolve=>{
      let actionSheet = this.actionSheet.create({
        title: title,
        buttons: this.setArrayButtonsJson(buttons, '', tapFunc,resolve)
      });
      actionSheet.present();
    });
  }
  showToasMessage(msg:string){
    this.showToast('',msg);
  }
  showToast(options_?:any,msg?:string) {
    var options={
      message: msg,
      duration: 3000,
      position: 'top',
      showCloseButton:true,
      closeButtonText:"סגור",
    };
    if(typeof options_ == 'object'){
      for(var key in options_){
        options[key]=options_[key];
      }
    }
    if(options.position == 'bottom'){
      options["cssClass"] = "above-tabs";
    }
    let toast = this.toastCtrl.create(options);
    toast.present(toast);
  }
  sumCombinations(k:number,n:number):number{
    return this.factorial(n)/this.factorial(n-k)*this.factorial(k);
  }
  private factorialMem:any = {};
  private factorial(n){
    if(this.factorialMem[n])
      return this.factorialMem[n];
    return this.factorialMem[n] = n==1?1:n*this.factorial(n-1);
  }

  static normalizeDate(date:string):Date{
    return new Date(date.replace('IDT','').replace('IST',''));
  }
}

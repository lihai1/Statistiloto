/**
 * Created by LihaiMac on 2/28/17.
 */
import {ActionSheetController, ToastController} from 'ionic-angular';

import {Injectable} from '@angular/core'

@Injectable()
export class appTools {
  constructor(private actionSheet:ActionSheetController,private toastCtrl:ToastController) {
  }

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

  setArrayButtonsJson(arr:any[], itemText:string, callback:Function,resolve:Function):any[] {
    let buttons = [];
    let pre = itemText ? itemText : '';
    arr.forEach((elem)=> {
      var tmp:string = '';
      if(elem.numbers) elem=elem.numbers;
      elem.forEach((num)=>tmp+=' '+num);
      buttons.push({
        text: pre + " " + tmp,
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

  showToast(position:string,msg:string) {
    var options={
      message: msg,
      duration: 2000,
      position: position,
      showCloseButton:true,
      closeButtonText:"סגור",

    };
    if(position == 'bottom'){
      options["cssClass"] = "above-tabs";
    }
    let toast = this.toastCtrl.create(options);
    toast.present(toast);
  }

}

/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input, ElementRef} from '@angular/core';
import {AppTools} from '../../services/appTools.service'

import {ToastController, ItemSliding, ModalController} from 'ionic-angular';
import {userData, numberData} from '../../services/user.service';
import {AnalyzedFormPage} from "../../pages/analyzed-form/analyzed-form";

@Component({
  selector: 'lottery-list',
  templateUrl: 'lottery-list.html'
})
export class LotteryList {
  @Input() data:numberData[];
  @Input('recordType') recordType:string;
  @Input() add:boolean = true;
  @Input() disabled:boolean = false;

  constructor(myElement:ElementRef,
              private modalCtrl:ModalController,
              private user:userData,
              public toastCtrl:ToastController,
              private app:AppTools) {
    this.toastCtrl = toastCtrl;
    this.user = user;
    this.app = app;
    //debugger;
  }

  addToService(item:numberData, slidingItem:ItemSliding) { //todo
    this.app.showToast("bottom", 'הטופס נוסף למספרי המזל');
    if (this.recordType == 'form')
      this.user.addFormData([item]);
    else if (this.recordType == 'group')
      this.user.addSetData([item]);
    if (this.recordType == 'lucky')
      this.user.addToBuild([item]);
    slidingItem.close();
  }

  removeItem(index:number, slidingItem:ItemSliding) {
    slidingItem.close();
    this.data.splice(index, 1);
  }

  analyzeModal(item:numberData, slidingItem:ItemSliding) {
    slidingItem.close();
    let modal = this.modalCtrl.create(AnalyzedFormPage, {form: item});
    modal.present();
  }
}


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-list/lottery-list.component.ts

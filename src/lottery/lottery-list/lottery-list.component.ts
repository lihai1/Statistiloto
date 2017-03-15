/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';

import {ToastController , ItemSliding} from 'ionic-angular';
import {userData , numberData} from '../../services/user.service';

@Component({
    selector: 'lottery-list',
    template: `
        <ion-item-sliding *ngFor="let item of data" #slidingItem>
          <ion-item>
          <ion-badge *ngFor="let num of item.numbers; let i=index;" item-right>{{num}}</ion-badge>
         <!--   <span class="ball" >{{num}}</span>-->
          </ion-item>
          <ion-item-options side="right" *ngIf="add">
            <button ion-button (click)="addToService(item,slidingItem)" color="positive" icon-left>
              <ion-icon name="add-circle"></ion-icon>
              הוסף
            </button>
          </ion-item-options>
          <ion-item-options side="left" >
            <button ion-button color="danger" (click)="removeItem(i,slidingItem)" icon-left>
              <ion-icon name="add-circle"></ion-icon>
              מחק
            </button>
          </ion-item-options>
        </ion-item-sliding>
        `
})
export class LotteryList {
  @Input() data:numberData[];
  @Input() recordType:string;
  @Input() add:boolean = true;

  constructor( private user:userData, public toastCtrl:ToastController) {
    this.toastCtrl = toastCtrl;
    this.user = user;
  }

  addToService(item:numberData,slidingItem:ItemSliding) { //todo
    this.showToast("bottom",'הטופס נוסף למספרי המזל');
    if(this.recordType =='form')
      this.user.addToBuild([item]);
    else if(this.recordType == 'group')
      this.user.addSetData([item]);
    if(this.recordType == 'group')
      this.user.addSetData([item]);
    if(this.recordType == 'lucky')
      this.user.addToBuild([item]);
    slidingItem.close();
  }
  removeItem(index:number,slidingItem:ItemSliding){
    slidingItem.close();
    this.data.splice(index,1);
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
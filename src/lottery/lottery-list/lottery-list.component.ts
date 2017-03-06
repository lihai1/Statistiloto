/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';

import {NavController} from 'ionic-angular';
import {userData} from '../../services/user.service';

@Component({
    selector: 'lottery-list',
    template: `
        <ion-item-sliding *ngFor="let item of data">
          <ion-item>
            <span class="ball" *ngFor="let num of item">{{num}}</span>
          </ion-item>
          <ion-item-options side="right">
            <button ion-button (click)="addToBuild(item)" color="positive" icon-left>
              <ion-icon name="add-circle"></ion-icon>
              Add
            </button>
          </ion-item-options>
          <ion-item-options side="left">
            <button ion-button color="danger" icon-left>
              <ion-icon name="add-circle"></ion-icon>
              Discard
            </button>
          </ion-item-options>
        </ion-item-sliding>
        `
})
export class LotteryList {
    list:number[] = [];
    listType:string = "";
    @Input() data:number[];

    constructor(public navCtrl:NavController,private user:userData) {
        this.user = user;
    }
    addToBuild(item:number[]){
        this.user.addToBuild(item);
    }

}

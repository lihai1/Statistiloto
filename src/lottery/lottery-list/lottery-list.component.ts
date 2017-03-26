/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input, ElementRef} from '@angular/core';
import {AppTools} from '../../services/appTools.service'

import {ToastController, ItemSliding, ModalController, InfiniteScroll} from 'ionic-angular';
import {userData, numberData} from '../../services/user.service';
import {AnalyzedFormPage} from "../../pages/analyzed-form/analyzed-form";

@Component({
  selector: 'lottery-list',
  templateUrl: 'lottery-list.html'
})
export class LotteryList {
  //@Input() data:numberData[];
  loadedData:numberData[] = [];
  loaded:number;
  private allData:numberData[];
  startLoaded:number = 10;
  @Input('recordType') recordType:string;
  @Input() add:boolean = true;
  @Input() disabled:boolean = false;
  needInfinite:boolean;
  constructor(myElement:ElementRef,
              private modalCtrl:ModalController,
              private user:userData,
              public toastCtrl:ToastController,
              private app:AppTools) {
      this.loaded = this.startLoaded;
  }
  @Input() public set data(d: any) {
    this.allData = d;
    this.loadedData=[];
    this.checkInfiniteNeed();
    for (let i = 0; this.data&&i < this.startLoaded && i<this.data.length; i++) {
      this.loadedData.push(this.data[i]);
    }
  }
  public get data() {
    return this.allData;
  }
  ngOnInit() {
    // DO IT

  }
  private checkInfiniteNeed(){
      this.needInfinite=this.data&&this.data.length>this.startLoaded;
  }
  doInfinite(infiniteScroll:InfiniteScroll) {
    console.log('Begin async operation');

     //setTimeout(() => {
    for (let i = this.loaded; i < this.startLoaded + this.loaded &&i<this.data.length; i++) {
      this.loadedData.push(this.data[i]);
    }
    this.checkInfiniteNeed();
    this.loaded = this.startLoaded + this.loaded;
    console.log('Async operation has ended');
    infiniteScroll.complete();
   // }, 500);
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

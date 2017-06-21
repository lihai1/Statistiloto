/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';

import {ToastController, ItemSliding, ModalController, InfiniteScroll} from 'ionic-angular';
import {AppTools} from "../../services/appTools.service";
import {userData} from "../../services/user.service";
import {AnalyzedFormPage} from "../../pages/analyzed-form/analyzed-form";
import {UserNumbers} from "../../services/models/UserNumbers";

@Component({
  selector: 'lottery-list',
  templateUrl: 'lottery-list.html'
})
export class LotteryList {
  //@Input() data:SavedNumbers[];
  loadedData:UserNumbers[] = [];
  loaded:number;
  private allData:UserNumbers[];
  startLoaded:number = 10;
  @Input('recordType') recordType:string;
  @Input() add:boolean = true;
  @Input() disabled:boolean = false;
  lastBallClass:string = '';

  needInfinite:boolean;

  constructor(private modalCtrl:ModalController,
              private user:userData,
              public toastCtrl:ToastController,
              private app:AppTools) {
    this.loaded = this.startLoaded;
  }

  @Input()
  public set data(d:any) {
    this.allData = d;
    this.convertDataForDIsplay();
    this.loadedData = [];
    this.checkInfiniteNeed();
    for (let i = 0; this.data && i < this.startLoaded && i < this.data.length; i++) {
      this.loadedData.push(this.data[i]);
    }
  }

  public get data() {
    return this.allData;
  }

  ngOnInit() {
    // DO IT

  }

  ngAfterViewInit() {
    if (this.recordType == 'lucky')
      this.lastBallClass = 'regular-ball';
  }

  private checkInfiniteNeed() {
    this.needInfinite = this.data && this.data.length > this.startLoaded;
  }

  doInfinite(infiniteScroll:InfiniteScroll) {
    console.log('Begin async operation');

    //setTimeout(() => {
    for (let i = this.loaded; i < this.startLoaded + this.loaded && i < this.data.length; i++) {
      this.loadedData.push(this.data[i]);
    }
    this.checkInfiniteNeed();
    this.loaded = this.startLoaded + this.loaded;
    console.log('Async operation has ended');
    infiniteScroll.complete();
    // }, 500);
  }

  addToService(item:UserNumbers, slidingItem:ItemSliding) { //todo
    debugger;
    this.app.showToast("bottom", 'הטופס נוסף למספרי המזל');
    if (this.recordType == 'form')
      this.user.addFormDataSync([item]);
    else if (this.recordType == 'group')
      this.user.addSetDataSync([item]);
    if (this.recordType == 'lucky')
      this.user.addToBuildSync([item]);
    slidingItem.close();
  }

  removeItem(index:number, slidingItem:ItemSliding) {
    slidingItem.close();
    this.allData.splice(this.loaded - 10 + index, 1);
    this.loadedData.splice(index, 1);

  }

  analyzeModal(item:UserNumbers, slidingItem:ItemSliding) {
    slidingItem.close();
    //debugger;
    let modal = this.modalCtrl.create(AnalyzedFormPage, {form: item.numbers});
    modal.present();
  }

  convertDataForDIsplay():UserNumbers[] {
    //debugger;
    var res:UserNumbers[] = [];
    if (this.allData&&this.allData.length > 0) {
      if (this.allData[0].numbers != undefined && this.allData[0].numbers.numbers == undefined) {
        this.allData.forEach((elem, index, arr)=> {
          res.push(new UserNumbers(elem.numbers));
        });
        this.allData = res;
      }
      if (this.allData[0].numbers == undefined ) {
        this.allData.forEach((elem, index, arr)=> {
          res.push(new UserNumbers(elem));
        });
        this.allData = res;
      }
    }
    return res;
  }

}

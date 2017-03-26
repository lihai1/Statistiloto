import {Component, Input} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
import {AnalyzedData, ArraysFilter} from "../../pipes/arrays-filter";
import {userData, numberData} from "../../services/user.service";
/*
 Generated class for the AnalyzedForm page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-analyzed-form',
  templateUrl: 'analyzed-form.html',
  providers: [ArraysFilter]
})
export class AnalyzedFormPage {
  @Input() form:numberData;
  analyzed:AnalyzedData[];
  currentList:AnalyzedData[];

  constructor(private lottery:LotteryApi,
              private analyzedPipe:ArraysFilter,
              private viewCtrl:ViewController,
              public navCtrl:NavController,
              public navParams:NavParams) {
    if(navParams.get('form'))
      this.form = navParams.get('form');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnalyzedFormPage');
    this.lottery.getAnalyze(this.form.numbers).then(data => {
      this.analyzed=this.analyzedPipe.transform(data,6);
      this.currentList = this.analyzed;
    });
  }
  currentItem:number=1;
  setTab(i:number){
    this.currentItem=i;
    setTimeout(()=>window.scrollTo(0,0),100);
  }
  setOpen(item: any){
    var index;
    if(index = this.currentList.indexOf(item)==-1){
     // this.currentList.push(item);
    }
    else{
    //  this.currentList.splice(index,1);
    }
  }
  open(item:any){
    return this.currentList.indexOf(item) >-1;
  }
  closePage() {
    this.viewCtrl.dismiss(this.analyzed);
  }
}

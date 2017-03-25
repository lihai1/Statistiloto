/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
import {AlertController, Platform, LoadingController} from "ionic-angular/index";
@Injectable()
export class LotteryApi {
  baseUrl:string;
  generate:string = 'form';
  calcStat:string = 'pares';
  analyze:string = 'analyze';

  constructor(platform:Platform, private http:Http,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
    console.log('lottery Api.. initialized!!');
    if (platform.is('core')) {
      this.baseUrl = 'http://localhost:8080/generate/';
    }
    else {
      this.baseUrl = 'http://statistiloto1.herokuapp.com/generate/';
    }
  }

  //baseUrl:string='https://protected-wildwood-80803.herokuapp.com/myresource/';
  //baseUrl:string = 'http://localhost:8080/generate/';

  startDate:Date;
  endDate:Date;

  setStartDate(date:Date) {
    this.startDate = date;
  }

  setEndDate(date:Date) {
    this.endDate = date;
  }

  getNewForms(type_:number, howMany:number, willBe:number[], strong?:string):Promise<any> {
    var loader = this.presentLoading();

    return this.http.post(this.baseUrl + this.generate, {
      willBe: willBe != undefined ? willBe : [],
      howMany: howMany,
      type: type_,
      from: this.startDate,
      to: this.endDate,
      strong: (strong == undefined || strong == 'strong') ? 0 : 1
    }).toPromise()
      .then(data=> {
        loader.dismiss();
        return data.json();
      }).catch(err=> {
        loader.dismiss();
        this.badAlert();
        return Promise.resolve([]);
      });
  }

  getNewPares(type:number, howMany:number, strong?:string):Promise<any> {
    var loader = this.presentLoading();
    return this.http.post(this.baseUrl + this.calcStat, {
      howMany: howMany,
      type: type,
      from: this.startDate,
      to: this.endDate,
      strong: (strong == undefined || strong == 'strong') ? 0 : 1
    }).toPromise()
      .then(data=> {
        loader.dismiss();
        return data.json();
      }).catch(err=> {
        loader.dismiss();
        this.badAlert();
        return Promise.resolve([]);
      });
  }


  getAnalyze(form:number[]):Promise<any> {
    return this.http.post(this.baseUrl + this.analyze, {
      from: this.startDate,
      to: this.endDate,
      form: form
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        this.badAlert();
        return Promise.resolve([]);
      });

  }

  private presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "מחשב",
      duration: 3000
    });
    loader.present();
    return loader;
  }

  private badAlert() {
    this.alertCtrl.create({
      title: 'שגיאה',
      subTitle: 'בעית חיבור לאינטרנט, אנא נסה שוב',//'your app is ready to reload with a new update',
      buttons: [{
        text: 'אשר'
      }]
    }).present();
  }
}


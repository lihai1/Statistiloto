/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
import {Platform, LoadingController, AlertController} from "ionic-angular/index";
import {Observable} from "rxjs/Rx";
import {AppSettings} from "./appSettings.service";
@Injectable()
export class LotteryApi {

  analyze:string = 'analyze';

  constructor(platform:Platform, private http:Http,
              private loadingCtrl:LoadingController,
              private settings:AppSettings,
              private alertCtrl:AlertController) {
    console.log('lottery Api.. initialized!!');

  }

  startDate:Date;
  endDate:Date;
  willBe:number[];
  setStartDate(date:Date) {
    this.startDate = date;
  }

  setEndDate(date:Date) {
    this.endDate = date;
  }

  private handleError(error:any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg:string;
   // if (error instanceof Response) {
      //const body = error.json() || '';
      //const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${error}`;
  //  } else {
     // if (typeof(error) == "object")
        errMsg = error.message ? error.message : error.toString();
   // }
    console.error(errMsg);
    return Observable.throw(error);
  }

  private extractData(res:Response | any) {
    let body = res.json();
    //debugger;
    return body;//.data;
  }

  getNewForms(type_:number, howMany:number, willBe:any, strong?:string):Observable<any> {
    debugger;
    try{
      willBe = willBe.numbers.numbers;
    }
    catch(e){

    }
    var loader = this.presentLoading();
  this.willBe = willBe;
    return this.http.post(this.settings.API_GERENRATE_FORMS, {
      willBe: willBe != undefined ? willBe : [],
      howMany: howMany,
      type: type_,
      from: this.startDate,
      to: this.endDate,
      strong: (strong == undefined || strong == 'strong') ? 0 : 1
    }).map((res)=> {
      loader.dismiss();
      return this.extractData(res);
    })
      .catch(this.handleError);
  }

  getNewPares(type:number, howMany:number, strong?:string):Observable<any> {
    var loader = this.presentLoading();
    return this.http.post(this.settings.API_GERENRATE_STATISTICS, {
      howMany: howMany,
      type: type,
      from: this.startDate,
      to: this.endDate,
      strong: (strong == undefined || strong == 'strong') ? 0 : 1
    }).map((res) => {
      loader.dismiss();
      return this.extractData(res);
    }).catch(err => {
      loader.dismiss();
      this.badAlert();
      return this.handleError(err);
    });
  }


  getAnalyze(form:number[]):Observable<any> {
    return this.http.post(this.settings.API_ANALYZE_NUMBERS, {
      from: this.startDate,
      to: this.endDate,
      form: form
    }).map(this.extractData)
      .catch(err => {
        this.badAlert();
        return this.handleError(err);
      });
  }

  private presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "מחשב"//,
     // duration: 3000
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


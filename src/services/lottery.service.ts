/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'

import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
import {AlertController} from "ionic-angular/index";
@Injectable()
export class LotteryApi {

  constructor(private http:Http,private alertCtrl:AlertController) {
    console.log('lottery Api.. initialized!!');
    // this.http=http;
  }

  //baseUrl:string='https://protected-wildwood-80803.herokuapp.com/myresource/';
  baseUrl:string = 'http://localhost:8080/generate/';
  //baseUrl:string='https://statistiloto1.herokuapp.com/generate/';
  generate:string = 'form';
  calcStat:string = 'pares';
  analyze:string = 'analyze';

  startDate:Date;
  endDate:Date;
  setStartDate(date:Date){
    this.startDate=date;
  }
  setEndDate(date:Date){
    this.endDate=date;
  }
  getNewForms(type_:number, howMany:number, willBe:number[],strong?:string):Promise<any> {
    return this.http.post(this.baseUrl + this.generate, {
      //from:new Date().toISOString(), todo
      // to:new Date().toISOString(), todo
      willBe: willBe != undefined ? willBe : [],
      howMany: 5,
      type: type_,
      from:this.startDate,
      to:this.endDate,
      strong: (strong==undefined || strong == 'strong')?0:1
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        this.badAlert();
        return Promise.resolve([]);
      });
  }

  getNewPares(type:number, howMany:number,strong?:string):Promise<any> {
    return this.http.post(this.baseUrl + this.calcStat, {
      howMany: howMany,
      type: type,
      from:this.startDate,
      to:this.endDate,
      strong: (strong==undefined || strong == 'strong')?0:1
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        this.badAlert();
        return Promise.resolve([]);
      });
  }


  getAnalyze(form:number[]):Promise<any> {
    return this.http.post(this.baseUrl + this.analyze, {
      from:this.startDate,
      to:this.endDate,
      form: form
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        this.badAlert();
        return Promise.resolve([]);
      });

  }

  private badAlert() {
    this.alertCtrl.create({
      title: 'שגיאה',
      subTitle: 'בעית חיבור לאינטרנט, אנא נסה שוב',//'your app is ready to reload with a new update',
      buttons: [{
        text:'אשר'}]
    }).present();
  }
}


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts



// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts


// WEBPACK FOOTER //
// ./src/services/lottery.service.ts



// WEBPACK FOOTER //
// ./src/services/lottery.service.ts

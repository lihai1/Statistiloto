/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
//import {userData, numberData} from 'user.service';

import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
@Injectable()
export class LotteryApi {

  constructor(private http:Http) {
    console.log('lottery Api.. initialized!!');
    // this.http=http;
  }

  //baseUrl:string='https://protected-wildwood-80803.herokuapp.com/myresource/';
  //baseUrl:string = 'http://localhost:8080/generate/';
  baseUrl:string='https://statistiloto1.herokuapp.com/generate/';
  generate:string = 'form';
  calcStat:string = 'pares';

  startDate:Date;
  endDate:Date;
  setStartDate(date:Date){
    this.startDate=date;
  }
  setEndDate(date:Date){
    this.endDate=date;
  }
  getNewForms(type_:number, howMany:number, willBe:number[]):Promise<any> {
    return this.http.post(this.baseUrl + this.generate, {
      //from:new Date().toISOString(), todo
      // to:new Date().toISOString(), todo
      willBe: willBe != undefined ? willBe : [],
      howMany: 5,
      type: type_,
      from:this.startDate,
      to:this.endDate,
      strong: 0
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        return Promise.resolve([[1, 2, 3, 4], [5, 6, 7]]);
      });
  }

  getNewPares(type:number, howMany:number):Promise<any> {
    return this.http.post(this.baseUrl + this.calcStat, {
      howMany: howMany,
      type: type,
      strong: 0
    }).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        return Promise.resolve([[1, 2, 3, 4], [5, 6, 7]]);
      });
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

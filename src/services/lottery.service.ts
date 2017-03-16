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
    constructor(private http: Http){
        console.log('lottery Api.. initialized!!');
       // this.http=http;
    }
    //baseUrl:string='https://protected-wildwood-80803.herokuapp.com/myresource/';
    baseUrl:string='http://localhost:8080/generate/';
    generate:string='form';
    calcStat:string='pares';
    getNewForms(type:number,howMany:number,willBe:number[]): Promise<any> {
        return this.http.post(this.baseUrl+this.generate,{
            //from:new Date().toISOString(), todo
           // to:new Date().toISOString(), todo
            willBe:willBe != undefined?willBe:[],
            howMany:5,
            type:type,
            strong:0}).toPromise()
            .then(data=>{
                return data.json();
            }).catch(err=>{
                return Promise.resolve([[1,2,3,4],[5,6,7]]);
            });
    }
    getNewPares(type:number,howMany:number): Promise<any> {
        return this.http.post(this.baseUrl+this.calcStat,{
            howMany:howMany,
            type:type,
            strong:0}).toPromise()
            .then(data=>{
                return data.json();
            }).catch(err=>{
                return Promise.resolve([[1,2,3,4],[5,6,7]]);
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

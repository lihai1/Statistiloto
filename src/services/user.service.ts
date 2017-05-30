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
import {Device} from "@ionic-native/device";

@Injectable()
export class userData {
  user:any;
  constructor(private platform:Platform, private http:Http,
              private loadingCtrl:LoadingController,
              private settings:AppSettings,
              private alertCtrl:AlertController,
              private device:Device/*, private nativeStorage:NativeStorage*/) {
    this.getFromStorage();

    /*storage.ready().then(() => {

     // set a key/value
     // this.storage.set('name', 'Max');

     // Or to get a key/value pair
     storage.get('lucky').then((val) => {
     debugger;
     this.build = val;
     });
     storage.get('forms').then((val) => {
     this.forms = val;
     });
     storage.get('group').then((val) => {
     this.numbers = val;
     });
     });*/
    console.log('userData.. initialized!!');
    // this.http=http;
  }

  /*
   private addToStorage(type:string,record:numberData){
   this.storage.get('type').then(data=>{
   if(data){
   this.storage.set(type,data.push(record));
   }
   });
   }*/
  private getFromStorage() {
    /* this.platform.ready().then(() => {

     this.nativeStorage.getItem('group')
     .then(
     data => this.numbers = data,
     error => console.log('group' + error)
     );
     this.nativeStorage.getItem('lucky')
     .then(
     data => this.build = data,
     error => console.log('lucky' + error)
     );
     this.nativeStorage.getItem('forms')
     .then(
     data => this.forms = data,
     error => console.log('forms' + error)
     );
     });*/
  }

  private saveItem(type:string, data:numberData[]) {
    //this.nativeStorage.setItem(type, JSON.stringify(data));
  }

  private forms:numberData[] = [];
  private numbers:numberData[] = [];
  private build:numberData[] = [];

  private baseUrl:string = 'https://protected-wildwood-80803.herokuapp.com/myresource/';
  private getAll:string = 'getAll';

  getSavedForms():Promise<any> {
    return this.http.get(this.baseUrl + this.getAll).toPromise()
      .then(data=> {
        return data.json();
      }).catch(err=> {
        return Promise.resolve(this.forms);
      });
  }

  getSavedNumbers():Promise<any> {
    return Promise.resolve(this.numbers);
  }

  getNumbers():numberData[] {
    return this.numbers;
  }

  getForms():numberData[] {
    return this.forms;
  }

  addSetData(lucky:numberData[]) {
    // var tmp;
    // for(let i = 0;i<lucky.length;i++) {
    //  this.numbers.push(tmp = new numberData(lucky[i]));
    this.addAData(this.numbers, lucky);
    this.saveItem('group', this.numbers);
    // }
  }


  addFormData(lucky:numberData[]) {
    this.addAData(this.forms, lucky);
    this.saveItem('forms', this.numbers);
  }

  addToBuild(nums:numberData[]) {
    this.addAData(this.build, nums);
    this.saveItem('lucky', this.numbers);

  }

  getBuild():numberData[] {
    return this.build;
  }

  initBuild() {
    this.build = [];
  }

  private addAData(origin:numberData[], lucky:numberData[]) {
    // debugger;
    if (!origin.length) {
      for (var i = 0; i < lucky.length; i++)
        origin.push(lucky[i]);
      return;
    }
    var bad = false;
    for (var i = 0; i < lucky.length; i++) {
      var j = 0;
      if (lucky[i].numbers.length == origin[j].numbers.length) {
        for (j = 0; j < origin.length; j++) {
          var k = 0;
          for (k = 0; k < origin[j].numbers.length; k++) {
            if (lucky[i].numbers[k] != origin[j][k]) {
              break;
            }
          }
          if (k == origin[j].numbers.length) {
            bad = true;
          }
        }
      }
      if (!bad) {
        origin.push(lucky[i]);
      }
      else bad = false;
    }
  }


  convert(data:number[][]):numberData[] {
    var result = [];

    for (var i = 0; i < data.length && i < 15; i++)
      result.push(new numberData(data[i]));
    return result;
  }

  getAllNumbers() {
    var res:numberData[] = this.build.concat([]);
    var tmp;
    for (var i = 0; i < this.numbers.length; i++) {
      tmp = this.numbers[i].numbers.concat([]);
      tmp.pop();
      res = res.concat(new numberData(tmp));
    }
    return res;
  }


}
//var count_deb = 0;

export class numberData {
  public numbers:number[] = [];
  from:Date;
  to:Date;
  reqeustDate:Date;

  constructor(data:any) {
   // count_deb++;
    try {
      if (typeof data == 'object') {
        if (data.to != undefined) this.to = new Date(data.to);
        if (data.from != undefined) this.from = new Date(data.from);
        if (data.reqeustDate != undefined) this.from = new Date(data.reqeustDate);
        else this.reqeustDate = new Date();
        this.numbers = data;
      }
      // if (count_deb > 1000)
      // debugger;
      console.log('numberData.. initialized!!');
      // this.http=http;
    }
    catch (e) {
      console.log(e);
    }
  }

  isEmpty():boolean {
    return this.numbers.length == 0;
  }


}


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts


// WEBPACK FOOTER //
// ./src/services/user.service.ts

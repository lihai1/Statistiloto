/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
import {Platform, LoadingController, AlertController} from "ionic-angular/index";
import {Observable} from "rxjs/Rx";
import {AppSettings, NumbersCategory} from "./appSettings.service";
import {Device} from "@ionic-native/device";
import {AuthService} from "./auth.service";
import {LotteryApi} from "./lottery.service";
import {SavedNumbers} from "./models/SavedNumbers";
import {UserNumbers} from "./models/UserNumbers";

@Injectable()
export class userData {
  user:any;

  constructor(private auth:AuthService,
              private lottery:LotteryApi,
              private platform:Platform,
              private http:Http,
              private loadingCtrl:LoadingController,
              private settings:AppSettings,
              private alertCtrl:AlertController,
              private device:Device/*, private storage:Storage*/) {
    this.getFromStorage();

    /*storage.ready().then(() => {
      // set a key/value
      storage.set('age', 'Max1');

      // Or to get a key/value pair
      storage.get('age').then((val) => {
        alert(val);
        console.log('Your age is', val);
      });
    });*/
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
   private addToStorage(type:string,record:SavedNumbers){
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

  private saveItem(type:string, data:UserNumbers[]) {
    //this.nativeStorage.setItem(type, JSON.stringify(data));
  }

  private forms:UserNumbers[] = [];
  private numbers:UserNumbers[] = [];
  private build:UserNumbers[] = [];


  getSavedNumbers():Observable<any> {
    return this.http.post(this.settings.API_USER_SAVE, this.auth.getUser())
      .map(data=> {
        return data.json();
      });
  }

  getNumbers():UserNumbers[] {
    return this.numbers;
  }

  getForms():UserNumbers[] {
    return this.forms;
  }
/*
  private saveToServer(category:string,lucky:UserNumbers[]) {
    if (this.auth.getUser()) {
      return this.http.post(this.settings.API_USER_SAVE, {
        userId: this.auth.getUser().id,
        numbersId: category==NumbersCategory.API_USER_LUCKY?null:lucky[0].id,
        willBe: category==NumbersCategory.API_USER_LUCKY?lucky[0].numbers.numbers:this.lottery.willBe,
        category:category
      }).subscribe(data=> {
        console.log(data.json());
      });
    }
  }*/

  private saveToServer(category:string,lucky:UserNumbers[]) {
    if (this.auth.getUser()) {
      lucky[0].id=this.auth.getUser().id;
      return this.http.post(this.settings.API_USER_SAVE, lucky[0]).subscribe(data=> {
        console.log(data.json());
      });
    }
  }

  addSetData(lucky:UserNumbers[]) {
    this.addAData(this.numbers, lucky);
    this.saveItem(NumbersCategory.API_USER_GROUP, this.numbers);

  }

  addFormData(lucky:UserNumbers[]) {
    this.addAData(this.forms, lucky);
    this.saveItem(NumbersCategory.API_USER_FORM, this.numbers);
   // this.saveToServer(NumbersCategory.API_USER_FORM,lucky);
  }

  addToBuild(nums:UserNumbers[]) {
    this.addAData(this.build, nums);
    this.saveItem(NumbersCategory.API_USER_LUCKY, this.numbers);
  }


  addToBuildSync(param:UserNumbers[]) {
    this.addSetData(param);
    this.saveToServer(null,param);
  }

  addSetDataSync(param:UserNumbers[]) {
    this.addSetData(param);
    this.saveToServer(null,param);
  }

  addFormDataSync(param:UserNumbers[]) {
    this.addSetData(param);
    this.saveToServer(null,param);

  }

  getBuild():UserNumbers[] {
    return this.build;
  }

  initBuild() {
    this.build = [];
  }

  private addAData(origin:UserNumbers[], lucky:UserNumbers[]) {
    // debugger;
    if (!origin.length) {
      for (var i = 0; i < lucky.length; i++)
        origin.push(lucky[i]);
      return;
    }
    var duplicateCount = 0;
    for (var i = 0; i < lucky.length; i++) {
      var j = 0;
      for (j = 0; j < origin.length; j++) {
          if (lucky[i].id == origin[j].id) {
            break;
          }
      }

      if (j==origin.length) {
        origin.push(lucky[i]);
      }
      else duplicateCount++;
    }
    if(duplicateCount>0){
      console.log('found duplicates:'+duplicateCount+' total');
    }
  }

  private addAData1(origin:SavedNumbers[], lucky:SavedNumbers[]) {
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



  convert(category:string,data:number[][]):UserNumbers[] {
    var result = [];
    for (var i = 0; i < data.length; i++)
      result.push(new UserNumbers({category:category,data:data[i]}));
    return result;
  }
  convertSaved(data:SavedNumbers[]) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      result.push(new UserNumbers(data[i]));
    }
    return result;
  }
  getAllNumbers() {
    var res:UserNumbers[] = this.build.concat([]);
    var tmp;
    for (var i = 0; i < this.numbers.length; i++) {
      tmp = this.numbers[i].numbers.numbers.concat([]);
      tmp.pop();
      res = res.concat(new UserNumbers(tmp));
    }
    return res;
  }


}





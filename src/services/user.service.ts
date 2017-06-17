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
import { Storage } from '@ionic/storage';
import {UserStorage} from "./userStorage.service";

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
              private device:Device, private storage:Storage,private userStorage:UserStorage) {
    this.getFromStorage();
    //setTimeout(()=>{
    //  this.userStorage=UserStorage.getIstance();
   // },3000);

    console.log('userData.. initialized!!');
  }
  //userStorage:UserStorage;
  /*
   private addToStorage(type:string,record:SavedNumbers){
   this.storage.get('type').then(data=>{
   if(data){
   this.storage.set(type,data.push(record));
   }
   });
   }*/
  addAFormToStorage(toAdd:string, userNums:UserNumbers){
    if(this.user) {
      this.storage.get(this.user.email + ":" + toAdd).then((data) => {
        if (!data)
          data = [];
        data.push(userNums);
        this.storage.set(this.user.email + ":" + toAdd,data);
      });
    }
  }
  addForm(userNums:UserNumbers){
    this.addAFormToStorage(UserStorage.FORM,userNums);
  }
  addGroup(userNums:UserNumbers){
    this.addAFormToStorage(UserStorage.GROUP,userNums);
  }
  addLucky(userNums:UserNumbers){
    this.addAFormToStorage(UserStorage.LUCKY,userNums);
  }
  public getFromStorage() {
    this.userStorage.getFromStorage().subscribe(user => {
      this.user = {};
      //debugger;
      if(user) {
        this.user =user;
        this.platform.ready().then(() => {

          this.storage.ready().then(() => {

            this.storage.get(user.email + ":" + UserStorage.FORM).then((user) => {
              if (user) {
                this.addFormData(user);
              }
              else console.log('user storage: user not exist.');
            });
            this.storage.get(user.email + ":" + UserStorage.GROUP).then((user) => {
              if (user) {
                this.addSetData(user);
              }
              else console.log('user storage: user not exist.');
            });
            this.storage.get(user.email + ":" + UserStorage.LUCKY).then((user) => {
              if (user) {
                this.addToBuild(user);
              }
              else console.log('user storage: user not exist.');
            });
          });

        });
      }
    }, error => console.log("error getting user from storage: "+JSON.stringify(error)));
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
    this.addToBuild(param);
    this.addLucky(param[0]);

    //this.saveToServer(null,param);
  }

  addSetDataSync(param:UserNumbers[]) {
    this.addSetData(param);
    this.addGroup(param[0]);

    //this.saveToServer(null,param);
  }

  addFormDataSync(param:UserNumbers[]) {
    this.addFormData(param);
    this.addForm(param[0]);
    //this.saveToServer(null,param);

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


  clearData() {
    this.build = [];
    this.numbers = [];
    this.forms = [];
  }
}





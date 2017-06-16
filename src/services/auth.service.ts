import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {AlertController, LoadingController} from "ionic-angular";
import {Http} from "@angular/http";
import {Device} from "@ionic-native/device";
import {AppSettings} from "./appSettings.service";
import {SavedNumbers} from "./models/SavedNumbers";
import {UserNumbers} from "./models/UserNumbers";

export class User {
  email:string;
  password:string;
  uuid:string;
  numbers:Array<UserNumbers>;

  constructor(email:string, password:string,uid:string) {
    this.email = email;
    this.password = password;
    this.uuid = uid;
  }
}

@Injectable()
export class AuthService {
  currentUser:any;

  constructor(private settings:AppSettings,
              private device:Device,
              private http:Http,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {

  }

  private handleError(error:any) {
    //debugger;
    // In a real world app, you might use a remote logging infrastructure
    let errMsg:string;
    // if (error instanceof Response) {
    //const body = error.json() || '';
   // const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${error}`;

    console.error(errMsg);
    //debugger;
    return Observable.throw(error);
  }

  private extractData(res:Response | any) {
    let body = res.json();
    //debugger;
    return body;//.data;
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

  private presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "מחשב"//,
      // duration: 3000
    });
    loader.present();
    return loader;
  }

  /*public login(credentials) {
   if (credentials.email === null || credentials.password === null) {
   return Observable.throw("Please insert credentials");
   } else {
   return Observable.create(observer => {
   // At this point make a request to your backend to make a real check!
   let access = (credentials.password === "pass" && credentials.email === "email");
   this.currentUser = new User('Simon', 'saimon@devdactic.com');
   observer.next(access);
   observer.complete();
   });
   }
   }*/
login(user:User):Observable<User> {
    var loader = this.presentLoading();
    if (this.device.uuid)
      user.uuid = this.device.uuid;
    else user.uuid = "12";
    return this.http.post(this.settings.API_USER + "get", user).map((res) => {
      loader.dismiss();
      debugger;
      return this.currentUser = this.extractData(res);
    }).catch(err => {
      loader.dismiss();
      this.badAlert();
      return this.handleError(err);
    });
  }

  registerUser(user:User):Observable<any> {
    var loader = this.presentLoading();
    if (this.device.uuid)
      user.uuid = this.device.uuid;
    debugger;
    return this.http.post(this.settings.API_USER + "add", user).map((res) => {
      loader.dismiss();
      debugger;
      return this.currentUser = this.extractData(res);
    }).catch(err => {
      loader.dismiss();
      this.badAlert();
      return this.handleError(err);
    });
  }

  saveUserNumbers(nums:SavedNumbers):Observable<any> {
    var loader = this.presentLoading();

    return this.http.post(this.settings.API_USER_SAVE, nums).map((res) => {
      loader.dismiss();
      debugger;
      return this.extractData(res);
    }).catch(err => {
      loader.dismiss();
      this.badAlert();
      return this.handleError(err);
    });
  }

  getUser():any {
    return this.currentUser;
  }

  public getUserInfo():User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}

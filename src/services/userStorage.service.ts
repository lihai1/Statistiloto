/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import {Platform} from "ionic-angular/index";
import {UserNumbers} from "./models/UserNumbers";
import {User} from "./auth.service";
import {userData} from "./user.service";
import {Observable} from "rxjs/Rx";


@Injectable()
export class UserStorage {
  user:User;

  private forms:UserNumbers[] = [];
  private numbers:UserNumbers[] = [];
  private build:UserNumbers[] = [];
  private static obj;

  constructor(private storage:Storage, private platform:Platform) {
    this.setUser(new User('', '', 'no uuid at init'));
    this.getFromStorage();
    UserStorage.obj = this;
  }

  static getIstance(){
    return UserStorage.obj;
  }

  //todo create user class
  getUser():User {
    return this.user;
  }

  //todo create user class
  setUser(user:User):void {
    this.user = user;
    this.storage.set('user', user);
  }
  public static FORM = "form";
  public static GROUP = "group";
  public static LUCKY = "lucky";



  public getFromStorage():Observable<User> {
    //var promise = Pr
    return new Observable(observer => {
      this.platform.ready().then(() => {

        this.storage.ready().then(() => {

          this.storage.get('user').then((user) => {
            //debugger;
            if (user) {
              this.user = user;
            }
            else console.log('user storage: user not exist.');
            observer.next(user);
            observer.complete();
          });
        });
      });
    });
  }
}


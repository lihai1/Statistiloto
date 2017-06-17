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


@Injectable()
export class UserStorage {
  user:User;

  private forms:UserNumbers[] = [];
  private numbers:UserNumbers[] = [];
  private build:UserNumbers[] = [];


  constructor(private storage:Storage, private platform:Platform) {
    this.user = new User('', '', 'no uuid at init');
    this.getFromStorage();
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
  addAForm(toAdd){
    if(this.user.email != "") {
      this.storage.get(this.user.email + ":" + toAdd).then((user) => {
        if (user) {
          this.user = user;
        }
        else console.log('user storage: user not exist.');
      });
    }
  }
  addForm(){
    this.addAForm(UserStorage.FORM);
  }
  addGroup(){
    this.addAForm(UserStorage.GROUP);
  }
  addLucky(){
    this.addAForm(UserStorage.LUCKY);
  }
  
  
  private getFromStorage() {
    this.platform.ready().then(() => {

      this.storage.ready().then(() => {

        this.storage.get('user').then((user) => {
          if (user) {
            this.user = user;
          }
          else console.log('user storage: user not exist.');
        });
        this.storage.get(this.user.email + ":"+UserStorage.FORM).then((user) => {
          if (user) {
            this.user = user;
          }
          else console.log('user storage: user not exist.');
        });
        this.storage.get(this.user.email + ":"+UserStorage.GROUP).then((user) => {
          if (user) {
            this.user = user;
          }
          else console.log('user storage: user not exist.');
        });
        this.storage.get(this.user.email + ":"+UserStorage.LUCKY).then((user) => {
          if (user) {
            this.user = user;
          }
          else console.log('user storage: user not exist.');
        });
      });
    });
  }
}

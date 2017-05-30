/**
 * Created by LihaiMac on 2/28/17.
 */
import {Injectable} from '@angular/core'
import 'rxjs/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserForm {
  loginUser:any;

  constructor() {
    this.loginUser = {email: '', password: ''};
  }

  //todo create user class
  getUser():any {
    return this.loginUser;
  }

  //todo create user class
  setUser(user:any): void {
    return this.loginUser;
  }

}

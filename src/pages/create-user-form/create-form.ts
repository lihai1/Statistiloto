
import {Component} from '@angular/core';
import {NavController, AlertController, ViewController, Events} from 'ionic-angular';
import {AuthService, User} from '../../services/auth.service';
import {userData} from "../../services/user.service";
import {UserForm} from "../../services/userForm.service";
import {userFormsPage} from "../user/numbers";


@Component({
  selector: 'create-user-form',
  templateUrl: 'create-form.html'
})
export class CreateUserForm {
  createSuccess = false;
  registerCredentials : User= new User('','','');

  constructor(private nav: NavController,
              private viewCtrl:ViewController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private userData:userData,
              private events:Events,
              private userForm:UserForm) {
    this.registerCredentials = userForm.getUser();
  }

  public register() {
    this.auth.registerUser(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.events.publish('user:created', userFormsPage);

          //this.showPopup("Success", "Account created.");
        } else {
         // this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  closePage() {
    this.userForm.setUser(this.registerCredentials);
    this.viewCtrl.dismiss();
  }
}

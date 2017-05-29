
import { Component } from '@angular/core';
import {NavController, AlertController, ViewController} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {userData} from "../../services/user.service";

@Component({
  selector: 'create-user-form',
  templateUrl: 'create-form.html'
})
export class CreateUserForm {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController,
              private viewCtrl:ViewController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private userData:userData) {}

  public login() {
    this.userData.registerUser(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
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
  createAccount(){

  }
}

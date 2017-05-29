
import { Component } from '@angular/core';
import { NavController, AlertController , ModalController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import {CreateUserForm} from "../create-user-form/create-form";

@Component({
  selector: 'page-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(private modalCtrl:ModalController,private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  public login() {
    this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
  }

  public createAccount() {
    let modal = this.modalCtrl.create(CreateUserForm);
    modal.present();
   /* this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });*/
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
        //      this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}

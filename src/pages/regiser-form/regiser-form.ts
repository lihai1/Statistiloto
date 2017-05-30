import {Component} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import {AuthService, User} from '../../services/auth.service';
import {CreateUserForm} from "../create-user-form/create-form";
import {UserForm} from "../../services/userForm.service";

@Component({
  selector: 'page-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials : User= {email: '', password: '',uuid:''};

  constructor(private modalCtrl:ModalController,
              private userForm:UserForm,
              private nav:NavController,
              private auth:AuthService,
              private alertCtrl:AlertController) {
    this.registerCredentials = userForm.getUser();
  }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
        //  this.showPopup("Success", "Account created.");
        } else {
      //    this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  public createAccount() {
    this.userForm.setUser(this.registerCredentials);
    let modal = this.modalCtrl.create(CreateUserForm);
    modal.present();
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

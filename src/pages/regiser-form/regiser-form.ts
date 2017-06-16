import {Component, EventEmitter, Output} from '@angular/core';
import {NavController, AlertController, ModalController, Events} from 'ionic-angular';
import {AuthService, User} from '../../services/auth.service';
import {CreateUserForm} from "../create-user-form/create-form";
import {UserForm} from "../../services/userForm.service";
import {userFormsPage} from "../user/numbers";

@Component({
  selector: 'page-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials : User= new User('','','');
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modalCtrl:ModalController,
              private userForm:UserForm,
              private nav:NavController,
              private auth:AuthService,
              public events: Events,
              private alertCtrl:AlertController) {
    this.registerCredentials = userForm.getUser();
  }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
   //       debugger;

          console.log('User created!')
          this.events.publish('user:created', userFormsPage);
          //this.onLogin.emit(userFormsPage);
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

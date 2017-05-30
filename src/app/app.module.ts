import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {StatsPage} from "../pages/stats/stats";
import {userFormsPage} from "../pages/user/numbers";
import {HomePage} from "../pages/home/home";
import {LuckPage} from "../pages/luck/luck";
import {TabsPage} from "../pages/tabs/tabs";
import {LotteryList} from "../lottery/lottery-list/lottery-list.component";
import {MenuPage} from "../menu/menu.component";
import {AnalyzedFormPage} from "../pages/analyzed-form/analyzed-form";
import {RegisterPage} from "../pages/regiser-form/regiser-form";
import {LotteryLucky} from "../lottery/lottery-lucky/lottery-lucky.component";
import {LotteryForms} from "../lottery/lottery-forms/lottery-forms.component";
import {LotteryPares} from "../lottery/lottery-pares/lottery-pares.component";
import {AppTools} from "../services/appTools.service";
import {userData} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {LotteryApi} from "../services/lottery.service";
import {CloudSettings, CloudModule} from '@ionic/cloud-angular'
import {CreateUserForm} from "../pages/create-user-form/create-form";
import {AppSettings} from "../services/appSettings.service";
import {Device} from "@ionic-native/device";
import { UserForm} from "../services/userForm.service";

const cloudSettings:CloudSettings = {
  'core': {
    'app_id': '634a37b2'
  }
};


@NgModule({
  declarations: [
    MyApp,
    StatsPage,
    userFormsPage,
    HomePage,
    TabsPage,
    LuckPage,
    LotteryList,
    LotteryPares,
    LotteryForms,
    LotteryLucky,
    RegisterPage,
    CreateUserForm,
    AnalyzedFormPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatsPage,
    LuckPage,
    userFormsPage,
    HomePage,
    TabsPage,
    MenuPage,
    RegisterPage,
    CreateUserForm,
    AnalyzedFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppTools,
    userData,
    UserForm,
    AuthService,
    LotteryApi,
    AppSettings,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

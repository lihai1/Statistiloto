import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';

import {MyApp} from './app.component';
import {StatsPage} from '../pages/stats/stats';
import {userFormsPage} from '../pages/user/numbers';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LuckPage} from '../pages/luck/luck';
import {LotteryList} from '../lottery/lottery-list/lottery-list.component';
import {LotteryPares} from '../lottery/lottery-pares/lottery-pares.component';
import {LotteryForms} from '../lottery/lottery-forms/lottery-forms.component';
import {LotteryLucky} from '../lottery/lottery-lucky/lottery-lucky.component';
import {AppTools} from '../services/appTools.service'
import {RegisterPage} from '../pages/regiser-form/regiser-form';
import { AuthService } from '../services/auth.service';


import {MenuPage} from '../menu/menu.component';
import {AnalyzedFormPage} from "../pages/analyzed-form/analyzed-form";
import {LotteryApi} from "../services/lottery.service";
import {userData} from "../services/user.service";

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
    AnalyzedFormPage,
    MenuPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    CloudModule.forRoot(cloudSettings),
    HttpModule
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
    AnalyzedFormPage
  ],
  providers: [AppTools,userData,AuthService,LotteryApi, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

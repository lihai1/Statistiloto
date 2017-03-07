import {NgModule, ErrorHandler} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import {MyApp} from './app.component';
import {StatsPage} from '../pages/stats/stats';
import {userFormsPage} from '../pages/user/numbers';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LotteryList} from '../lottery/lottery-list/lottery-list.component';
import {LotteryPares} from '../lottery/lottery-pares/lottery-pares.component';
import {LotteryForms} from '../lottery/lottery-forms/lottery-forms.component';
import {LotteryLucky} from '../lottery/lottery-lucky/lottery-lucky.component';
import { MenuPage } from '../menu/menu.component';

const cloudSettings: CloudSettings = {
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
        LotteryList,
        LotteryPares,
        LotteryForms,
        LotteryLucky,
        MenuPage
    ],
    imports: [
        IonicModule.forRoot(MyApp,{
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
        userFormsPage,
        HomePage,
        TabsPage,
        MenuPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}

import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';

import {StatusBar, Splashscreen} from 'ionic-native';

//import { TabsPage } from '../pages/tabs/tabs';
import {MenuPage} from '../menu/menu.component.ts';
import {userData} from '../services/user.service.ts'
import {LotteryApi} from '../services/lottery.service.ts'

@Component({
    templateUrl: 'app.html',
    providers: [userData, LotteryApi, Deploy]
})
export class MyApp {
    rootPage = MenuPage;

    constructor(platform:Platform, deploy:Deploy) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
        deploy.channel = 'dev';
        deploy.check().then((snapshotAvailable: boolean) => {
            if (snapshotAvailable) {
                // When snapshotAvailable is true, you can apply the snapshot
                deploy.download().then(() => {
                    return deploy.extract();
                }).then(()=>{
                    deploy.load();
                });

            }
        });
    }
}

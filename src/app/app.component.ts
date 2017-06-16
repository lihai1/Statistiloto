import {Component} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Deploy} from '@ionic/cloud-angular';

//import { TabsPage } from '../pages/tabs/tabs';
import {MenuPage} from '../menu/menu.component.ts';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = MenuPage;
  right:boolean;
  constructor(platform:Platform, private deploy:Deploy, private alertCtrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      /*if (!platform.is('core')) {
        // This will only print when running on desktop
        console.log("I'm a regular browser!");
        deploy.channel = 'dev';
        deploy.check().then((snapshotAvailable:boolean) => {
          //alert('checked! '+snapshotAvailable);
          if (snapshotAvailable) {
            // When snapshotAvailable is true, you can apply the snapshot

            alertCtrl.create({
              title: '!יש לנו עדכון',
              subTitle: 'האפליקציה עודכנה, אשר לטעינה מחדש',//'your app is ready to reload with a new update',
              buttons: [{
                text: 'אשר',
                handler: ()=> {
                  deploy.download().then(() => {
                    return deploy.extract();
                  }).then(()=> {
                    deploy.load();
                  });
                }
              }, {
                text: 'לא הפעם',
              }]
            }).present();
          }

        });
      }*/
    });
  }
}

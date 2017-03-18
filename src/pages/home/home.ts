import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
//import {LotteryList} from '../../lottery/lottery-list/lottery-list.component';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
   // directives: [LotteryList]
})
export class HomePage {
    
    constructor(public navCtrl:NavController){
    }


}

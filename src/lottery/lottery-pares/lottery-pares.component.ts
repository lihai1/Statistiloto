/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component} from '@angular/core';

import {NavController , ActionSheetController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
import {userData , numberData} from '../../services/user.service';
import {appTools} from '../../services/appTools.service';

@Component({
    selector: 'lottery-pares',
    templateUrl: 'lottery-pares.html',
    providers: [LotteryApi]
})
export class LotteryPares {
    pares:number = 1;
    choices:number[] = [1, 2, 3, 4, 5, 6];
    paresRes:numberData[]=[];

    constructor(public navCtrl:NavController,
                private lotteryApi:LotteryApi,
                private user:userData,
                private appTools:appTools) {
        this.calcStatistics(this.pares, 5);
        this.user = user;
        this.appTools = appTools;
    }

    private setParesType(howMany) {
        this.pares = howMany;
    }

    paresChange(event) {
        this.calcStatistics(this.pares, 5);
    }

    presentActionSheet() {
        var self = this;
        this.appTools.presentActionSheet(this.choices,
            'systematic lottery',
            function(type){
                self.setParesType(type);
            });
    }

    calcStatistics(type_, howMany) {
        this.lotteryApi.getNewPares(type_, howMany).then(data => {
            console.log('calculated stats!!');
            console.log(data);
            this.paresRes = this.user.convert(data);
            //debugger;
            
           // this.user.addSetData(data);
        });
    }

}



// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts


// WEBPACK FOOTER //
// ./src/lottery/lottery-pares/lottery-pares.component.ts
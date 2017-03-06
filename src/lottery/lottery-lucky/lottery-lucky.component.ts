/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';
import {userData} from '../../services/user.service'
import {appTools} from '../../services/appTools.service'
@Component({
    selector: 'lottery-lucky',
    templateUrl: 'lottery-lucky.html',
    providers: [appTools]
})
export class LotteryLucky {
    willBe:number[] = [];
    constructor(private user:userData,
                private appTools:appTools) {
        this.user = user;
        this.appTools=appTools;
        this.willBe = user.getBuild();
    }

    addNumber(n:number) {
        this.willBe.push(n);
        // this.formsChange(null);
    }


    

}

/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LotteryApi} from '../../services/lottery.service';
import {LotteryLucky} from '../../lottery/lottery-lucky/lottery-lucky.component';
import {userData , numberData} from '../../services/user.service'
import {appTools} from '../../services/appTools.service'
@Component({
    selector: 'lottery-forms',
    templateUrl: 'lottery-forms.html',
    providers: [LotteryApi]
})
export class LotteryForms {
    formType:number = 6;
    formsRes:numberData[]=[];
    choices:number[] = [6, 7, 8, 9, 10, 11, 12];
    willBe:number[] = [];
    constructor(public navCtrl:NavController,
                private lotteryApi:LotteryApi,
                private user:userData,
                private appTools:appTools) {
        this.generateNewForms(this.formType, 5);
        this.user = user;
        this.appTools=appTools;
    }

    setFormType(_type) {
        this.formType = _type;
        // this.formsChange(null);
    }

    formsChange(event) {
        this.generateNewForms(this.formType, 5);
    }

    presentActionSheet() {
        var self = this;
        this.appTools.presentActionSheet(this.choices,
            'systematic lottery',
            function(type){
                self.setFormType(type);
            });
    }


    generateNewForms(type1, howMany) {
        this.lotteryApi.getNewForms(type1, howMany).then(data => {
            console.log('generated forms!!');
            console.log(data);
            this.formsRes = this.user.convert(data);
            //this.formsRes = data;
           // this.user.addFormData(this.formsRes);
        });
    }

}



// WEBPACK FOOTER //
// ./src/lottery/lottery-forms/lottery-forms.component.ts

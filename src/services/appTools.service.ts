/**
 * Created by LihaiMac on 2/28/17.
 */
import {ActionSheetController} from 'ionic-angular';

import {Injectable} from '@angular/core'

@Injectable()
export class appTools {
    constructor(private actionSheet:ActionSheetController){
    }

    setButtonsJson(arr:any[],itemText:string,callback:Function):any[]{
        let buttons = [];
        let pre = itemText?itemText:'';
        arr.forEach(function (elem) {
            buttons.push({
                text: pre +" "+ elem,
                handler: ()=> {
                    callback(elem);
                }
            });
        });
        return buttons;
    }
    presentActionSheet(buttons:any[],inputText:string,tapFunc:Function) {
        let actionSheet = this.actionSheet.create({
            title: 'choose lottery system',
            buttons: this.setButtonsJson(buttons,inputText,tapFunc)
        });
        actionSheet.present();
    }
}
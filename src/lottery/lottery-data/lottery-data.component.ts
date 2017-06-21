/**
 * Created by LihaiMac on 2/28/17.
 */
import {Component, Input} from '@angular/core';
import {UserNumbers} from "../../services/models/UserNumbers";


@Component({
  selector: 'lottery-data',
  templateUrl: 'lottery-data.html'
})
export class LotteryData {
  @Input() data:UserNumbers
  public ngOnInit() {
    var item = this.data;
    this.start=item.numbers.dateStart.getDate()+'/'+item.numbers.dateStart.getMonth()+'/'+item.numbers.dateStart.getFullYear();
    this.end=item.numbers.dateEnd.getDate()+'/'+item.numbers.dateEnd.getMonth()+'/'+item.numbers.dateEnd.getFullYear();
    this.saved=item.registered.getDate()+'/'+item.registered.getMonth()+'/'+item.registered.getFullYear();
  }

  start:string;
  end:string;
  saved:string;

  constructor() {
  }

}

/**
 * Created by LihaiMac on 5/30/17.
 */

import {Injectable} from '@angular/core'
import {Platform} from "ionic-angular/index";
@Injectable()
export class AppSettings {
  API_ENDPOINT:string;
  API_COMPUTING:string;
  API_USER:string;
  API_GERENRATE_FORMS:string;
  API_GERENRATE_STATISTICS:string;
  API_ANALYZE_NUMBERS:string;
  calcStat:string = 'pares';
  constructor(platform:Platform) {
    platform.ready().then(() => {
      if (platform.is('core')) {
        this.API_ENDPOINT = 'http://localhost:8080/';
      }
      else {
        this.API_ENDPOINT = 'http://statistiloto1.herokuapp.com/';
      }
      this.API_COMPUTING = this.API_ENDPOINT+'generate/';
      this.API_USER = this.API_ENDPOINT+'user/';
      this.API_GERENRATE_FORMS = 'form';
      this.API_GERENRATE_STATISTICS = 'pares';
      this.API_ANALYZE_NUMBERS = 'analyze';

    });
  }
}

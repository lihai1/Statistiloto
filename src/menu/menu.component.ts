/**
 * Created by LihaiMac on 3/5/17.
 */
import {Component, ElementRef, Renderer2} from '@angular/core';
import {MenuController} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs'
import {userFormsPage} from '../pages/user/numbers'
import {RegisterPage} from '../pages/regiser-form/regiser-form'
import {LotteryApi} from '../services/lottery.service';
import {AppTools} from '../services/appTools.service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'my-menu',
  templateUrl: 'menu.component.html'//,
  //directives: [RegisterPage]
})
export class MenuPage{

  pages:any[] = [{page:userFormsPage,text:'המספרים שלי'},
    {page:TabsPage,text:'סטטיסטיקה'},
    {page:RegisterPage,text:'הרשמה'}];

  private rootPage;
  start:string;
  end:string;
  minDate:string;
  maxDate:string;
  public set startDate(d: string) {
    this.start=d;
    this.lottery.setStartDate(new Date(d));
  }
  public set endDate(d: string) {
    this.end=d;
    this.lottery.setEndDate(new Date(d));
  }
  public get startDate():string {
    return this.start;
  }
  public get endDate() :string{
    return this.end;
  }
  side:string;
  constructor(public app:AppTools,
              public menuCtrl:MenuController,
              public lottery:LotteryApi,
              public el: ElementRef,
              public events: Events,
              public renderer: Renderer2) {
    menuCtrl.enable(true);
    this.rootPage = userFormsPage;
    var tmp:Date=new Date();
    // for safari dates
    tmp.setDate(12);
    tmp.setMonth(1);
    tmp.setFullYear(2004);
    this.minDate = tmp.toISOString();
    this.startDate = tmp.toISOString();
    this.maxDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    if(app.language == 'heb'){
      this.side = 'right';
      renderer.setStyle(el.nativeElement, 'direction', 'rtl');
    }
    else
      this.side = 'left';

    events.subscribe('user:created', (page) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.setPage(page);
    });

  }
  setPage(page) {
    this.rootPage = page;
    this.menuCtrl.close();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}


/**
 * Created by LihaiMac on 3/5/17.
 */
import {Component} from '@angular/core';
import {MenuController} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs'
import {userFormsPage} from '../pages/user/numbers'
import {RegisterPage} from '../pages/regiser-form/regiser-form'
import {LotteryApi} from '../services/lottery.service';


@Component({
  selector: 'my-menu',
  templateUrl: 'menu.component.html'
})
export class MenuPage{

  pages:any[] = [{page:userFormsPage,text:'הנתונים שלי'},
    {page:TabsPage,text:'סטטיסטיקה'},
    {page:RegisterPage,text:'הרשמה'}];
    
  private rootPage;
  start:string;
  end:string;
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
  
  constructor(public menuCtrl:MenuController, public lottery:LotteryApi) {
    menuCtrl.enable(true);
    this.rootPage = userFormsPage;
    this.startDate = new Date('2-12-2004').toISOString();
    this.endDate = new Date().toISOString();
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



// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts


// WEBPACK FOOTER //
// ./src/menu/menu.component.ts
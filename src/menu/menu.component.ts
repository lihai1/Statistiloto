/**
 * Created by LihaiMac on 3/5/17.
 */
import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs'
import {userFormsPage} from '../pages/user/numbers'

@Component({
    selector:'my-menu',
    templateUrl:'menu.component.html'
})
export class MenuPage {

    tab1Root: any = userFormsPage;
    tab2Root: any = TabsPage;
    private rootPage;
    constructor(public menuCtrl: MenuController) {
        menuCtrl.enable(true);
        this.rootPage = userFormsPage;
    }
    setPage(page){
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
import {HomePage} from '../home/home.page';
import { Component, ViewChild } from '@angular/core';
import { Platform,  IonicPage,   NavController,   NavParams,   Nav} from 'ionic-angular';
import { ListPage } from '../list/list';
import { CacheData } from '../../providers/storage/CacheData';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.menu.html',
})
export class MainMenu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userId:string;
  constructor(public platform: Platform) {

  }

  ionViewDidLoad() {
    this.userId = CacheData.id;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.push(page.component);

  }
}

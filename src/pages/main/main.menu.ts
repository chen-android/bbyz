import { FeedbackPage } from './../other/feedback/feedback.page';
import { CacheData } from './../../providers/storage/CacheData';
import { LoginPage } from './../login/login.page';
import { HomePage } from '../home/home.page';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, Nav, Platform, MenuController } from 'ionic-angular';

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
    userId: string;
    constructor(public platform: Platform, public alert: AlertController,public menu:MenuController) {

    }

    ionViewDidLoad() {
        this.userId = CacheData.id;
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.push(page.component);

    }
    logout() {
        this.alert.create({
            message:"是否确定退出",
            buttons:[
                {
                    text:"确定",
                    handler:()=>{
                        this.menu.close();
                        CacheData.reset();
                        this.nav.setRoot(LoginPage);
                    }
                },
                {
                    text:"取消",
                    role:"cancel",
                    handler:()=>{
                        this.menu.close();
                    }
                }
            ]
        }).present();
    }
    feedback() {
        this.nav.push(FeedbackPage);
    }
}

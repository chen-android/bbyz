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
    departDate: Date = new Date();
    busId:string;
    endStation:string;
    hotStation: {};
    constructor(public platform: Platform, public alert: AlertController, public menu: MenuController) {

    }

    ionViewDidLoad() {
        this.userId = CacheData.id;
        this.hotStation =
            [
                ["常用站点1", "常用站点2", "常用站点3"],
                ["常用站点4", "常用站点5", "常用站点6"],
                ["常用站点7"]
            ];
    }
    /** 个人中心menu */
    logout() {
        this.alert.create({
            message: "是否确定退出",
            buttons: [
                {
                    text: "确定",
                    handler: () => {
                        this.menu.close();
                        CacheData.reset();
                        this.nav.setRoot(LoginPage);
                    }
                },
                {
                    text: "取消",
                    role: "cancel",
                    handler: () => {
                        this.menu.close();
                    }
                }
            ]
        }).present();
    }
    feedback() {
        this.nav.push(FeedbackPage);
    }

    /** 车次筛选menu */
    hotStationClick(s:string){
        this.endStation = s;
    }
}

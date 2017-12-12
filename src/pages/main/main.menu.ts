import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { BusTypeItem } from './../../module/BusTypeItem';
import { FeedbackPage } from './../other/feedback/feedback.page';
import { CacheData } from './../../providers/storage/CacheData';
import { LoginPage } from './../login/login.page';
import { HomePage } from '../home/home.page';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { BusTypeItem } from '../../module/BusTypeItem';
import { dateValueRange } from 'ionic-angular/util/datetime-util';
import { getLocaleDateFormat } from '@angular/common/src/i18n/locale_data_api';

/**
 * 
 *主页 菜单页
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
    minDate: string;
    maxDate: string;
    selectDate: string;
    canSelectDates:Array<string>;
    busId:string;
    endStation:BusTypeItem;
    hotStation:{};
    showOvertime:boolean;
    constructor(public navCtrl:NavController,public platform: Platform, public alert: AlertController, public menu: MenuController,
        public http:HttpServices) {

    }

    ionViewDidLoad() {
        this.userId = CacheData.id;
        this.hotStation ;
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
        this.navCtrl.push(FeedbackPage);
    }

    personCenterOpen(){
        
    }
    stationFilterOpen(){
        if(this.canSelectDates==undefined){
            this.http.postRequest(CommandKeys.filterDate, { "StationID":CacheData.stationId},value=>{
                if(value.success){
                    let t:string = value.object[0]["Column1"];
                    let timeStage = t.split("~");
                    this.minDate = timeStage[0];
                    this.maxDate = timeStage[1];
                    this.selectDate = 
                }
                return false;
            })
        }
    }

    /** 车次筛选menu */
    hotStationClick(s:BusTypeItem){
        this.endStation = s;
    }
}

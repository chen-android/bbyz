import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, LoadingController, MenuController, Nav, NavController, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

import { HomePage } from '../home/home.page';
import { Site } from './../../module/Site';
import { HttpServices } from './../../providers/http/http.service';
import { CacheData } from './../../providers/storage/CacheData';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { CommandKeys } from './../../utils/CommandKeys';
import { EventKeys } from './../../utils/EventKeys';
import { LoginPage } from './../login/login.page';
import { FeedbackPage } from './../other/feedback/feedback.page';
import { SiteSearchPage } from './../site-search/site-search.page';

// import { ListPage } from './../list/list';
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
    busType: string = "0";
    busId: string;
    endStation: Site;
    hotStation: Array<Array<Site>>=[];
    showOvertime: boolean;
    constructor(public navCtrl: NavController, public platform: Platform, public alert: AlertController, public menu: MenuController,
        public http: HttpServices, public event: Events, public storage: StorageUtils,public loading:LoadingController) {
        this.selectDate = new Date().toISOString().substring(0, 10);
        this.event.subscribe(EventKeys.clearFilter,()=>{
            this.minDate = undefined;
            this.selectDate = new Date().toISOString().substring(0, 10);
            this.busType = "0";
            this.busId = undefined;
            this.endStation = undefined;
            this.hotStation = undefined;
            this.showOvertime = false;
        });
    }

    ionViewDidEnter(){
        this.userId = CacheData.id;
    }

    // test() {
    //     this.navCtrl.push(ListPage);
    // }

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
                        this.navCtrl.setRoot(LoginPage);
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

    personCenterOpen() {

    }
    stationFilterOpen() {
        if (this.minDate == undefined) {
            this.http.postRequest(CommandKeys.filterDate, { "StationID": CacheData.stationId }, value => {
                if (value.success) {
                    let t: string = value.object[0]["Column1"];
                    let timeStage = t.split("~");
                    this.minDate = timeStage[0];
                    this.maxDate = timeStage[1];
                }
                return false;
            })
        }
        this.storage.getFilterSite(CacheData.stationId).then(value => {
            if (value) {
                this.hotStation = new Array();
                let a: Array<Site>;
                for (let index = 0; index < value.length; index++) {
                    if (index % 3 == 0) {
                        a = new Array();
                    }
                    a.push(value[index]);
                    if (index % 3 == 2 || index == value.length - 1) {
                        this.hotStation.push(a);
                    }
                }
                console.info(this.hotStation);
            } else {
                this.hotStation = [];
            }
        });
    }
    stationCallBack = (params: Site) => {
        return new Promise((resolve, reject) => {
            if (typeof (params) != "undefined") {
                this.endStation = params;
                resolve("ok");
            } else {
                reject(Error("params error"));
            }
        });
    }
    endStationSelect() {
        if(this.busId){
            return;
        }
        this.navCtrl.push(SiteSearchPage, {
            "site": this.stationCallBack
        });
    }

    /** 车次筛选menu */
    hotStationClick(s: Site) {
        if (this.busId) {
            return;
        }
        this.endStation = s;
    }
    deleteEndSite(){
        this.endStation = undefined;
    }
    filterSubmit() {
        if (this.endStation) {
            this.storage.getFilterSite(CacheData.stationId).then(value => {
                if (value && value.length > 0) {
                    if (!value.find((value) => { return value.StopNo == this.endStation.StopNo; })) {
                        if (value.length == 9) {
                            value.shift();
                        }
                        value.push(this.endStation);
                        this.storage.setFilterSite(CacheData.stationId,value);
                    }
                } else {
                    value = new Array();
                    value.push(this.endStation);
                    this.storage.setFilterSite(CacheData.stationId,value);
                }
                this.hotStation = new Array();
                let a: Array<Site>;
                for (let index = 0; index < value.length; index++) {
                    if (index % 3 == 0) {
                        a = new Array();
                    }
                    a.push(value[index]);
                    if (index % 3 == 2 || index == value.length - 1) {
                        this.hotStation.push(a);
                    }
                }
            });
        }
        this.event.publish(EventKeys.stationFilter, this.selectDate, this.busType, this.busId, this.endStation, this.showOvertime);
    }
}

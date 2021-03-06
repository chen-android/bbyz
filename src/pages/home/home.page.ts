import { Component } from '@angular/core';
import { ActionSheetController, AlertController, MenuController, NavController } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';
import { SchemItem } from './../../module/SchemItem';
import { Site } from './../../module/Site';
import { Station } from './../../module/Station';
import { HttpServices } from './../../providers/http/http.service';
import { CacheData } from './../../providers/storage/CacheData';
import { CommandKeys } from './../../utils/CommandKeys';
import { EventKeys } from './../../utils/EventKeys';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html'
})
export class HomePage {
    upStation: string;
    selectDate: string;
    stationSelected: boolean = false;
    busType: number = 0;
    busId: string;
    endSite: Site;
    showOverTime: boolean = true;
    stationSelectClass: {};
    menuClass: {};
    stations: Array<Station> = undefined;
    selectedStation: Station;
    schemList: Array<SchemItem>;
    refresher: any;
    shouldRefresh:boolean = false;
    constructor(public navCtrl: NavController, public http: HttpServices, public action: ActionSheetController,
        public menu: MenuController, public alert: AlertController, public event: Events) {
        this.upStation = "请选择乘车站";
        this.selectDate = new Date().toISOString().substring(0, 10);
    }
    ionViewDidLoad() {
        this.setTitleClass();
        this.event.subscribe(EventKeys.stationFilter, (date: string, busType: number, busId: string, endSite: Site, showOverTime: boolean) => {
            this.selectDate = date;
            this.busType = busType;
            this.busId = busId;
            this.endSite = endSite;
            this.showOverTime = showOverTime;
            this.requestSchemList();
        });
        this.stationSelect();
    }
    ionViewDidEnter(){
        this.menu.enable(true, "personCenterMenu");
        this.menu.enable(true, "stationFilterMenu");
        if(this.shouldRefresh){
            this.requestSchemList();
            this.shouldRefresh = false;
        }
    }
    ionViewDidLeave(){
        this.menu.enable(false,"personCenterMenu");
        this.menu.enable(false,"stationFilterMenu");
    }
    ionViewWillUnload(){
        this.event.unsubscribe(EventKeys.stationFilter);
    }

    setTitleClass() {
        this.stationSelectClass = {
            "home_station_select": true,
            "home_station_select_defalut": !this.stationSelected,
            "home_station_select_selected": this.stationSelected
        };
        this.menuClass = {
            "home_menu": true,
            "home_menu_hide": !this.stationSelected,
            "home_menu_show": this.stationSelected
        }
    }
    /** 选择车站 */
    stationSelect() {
        this.requestCanSelectedStation();
    }
    /* 刷新 */
    doRefresh(refresher: any) {
        this.requestSchemList(false);
        this.refresher = refresher;
    }
    noDataRefresh(){
        this.requestSchemList(true);
    }
    /**获取可查询车站 */
    requestCanSelectedStation() {
        if (this.stations == undefined) {
            this.http.postRequest<Array<Station>>(CommandKeys.canSelectedStation, undefined, value => {
                if (value.success) {
                    this.stations = value.object;
                    if (this.stations != null && this.stations.length > 0) {
                        this.showStationDialog();
                    } else {
                        this.alert.create({
                            title: "提示",
                            message: "无可操作的车站",
                            buttons: [
                                {
                                    text: "确认",
                                    role: "cancel"
                                }
                            ]
                        }).present();
                    }
                }
                return false;
            });
        } else {
            this.showStationDialog();
        }
    }

    requestSchemList(showProgress = true) {
        let content = {
            "StationID": CacheData.stationId,
            "DriveDate": this.selectDate,
            "SchemNo": this.busId,
            "StopNo": this.endSite ? this.endSite.StopNo : "",
            "ShowOverTimeSchem": this.showOverTime ? 1 : 0
        };
        this.http.postRequest<Array<SchemItem>>(CommandKeys.schemlist, content, value => {
            if (value.success) {
                let f = value.object.filter((item) => {
                    if (this.busType == 0) {
                        return true;
                    } else {
                        return this.busType == item.SchemTypeCode;
                    }
                });
                if (f && f.length > 0) {
                    this.schemList = f;
                } else {
                    this.schemList = undefined;
                }
            }
            if (this.refresher) {
                this.refresher.complete();
            }
            return false;
        }, error => {
            if (this.refresher) {
                this.refresher.complete();
            }
            this.schemList = undefined;
        },{
            showProgress: showProgress
        });
    }

    showStationDialog() {
        let bts = [];
        this.stations.forEach((value, index) => {
            bts[index] = {
                text: value.StationName,
                handler: () => {
                    if (this.selectedStation && this.selectedStation.ID == value.ID) {
                        return;
                    }
                    this.selectedStation = value;
                    this.upStation = value.StationName;
                    CacheData.stationId = this.selectedStation.ID;
                    this.resetFilter();
                    this.requestSchemList();
                    if (!this.stationSelected) {
                        this.stationSelected = true;
                        this.setTitleClass();
                    }
                    this.event.publish(EventKeys.clearFilter);
                }
            }
        });
        bts[bts.length] = {
            text: "取消",
            role: "cancel",

        }
        this.action.create({
            buttons: bts,
            enableBackdropDismiss: true
        }).present();
    }

    resetFilter() {
        this.busId = undefined;
        this.busType = 0;
        this.endSite = undefined;
        this.selectDate = new Date().toISOString().substring(0, 10);
        this.showOverTime = true;
    }

    showSearchDialog() {
        this.action.create({
            buttons: [
                {
                    text: '售票明细查询',
                    handler: () => {
                        this.navCtrl.push('SearchSaleDetailPage');
                    }
                },
                {
                    text: '票号追踪查询',
                    handler: () => {
                        this.navCtrl.push('SearchTicketNumberPage');
                    }
                },
                {
                    text: '疑问班次查询',
                    handler: () => {
                        this.navCtrl.push('SearchIssueBusPage');
                    }
                }
            ],
            enableBackdropDismiss: true
        }).present();
    }
    schemClick(s: SchemItem) {
        this.navCtrl.push('SchemDetailPage', { 
            schemNo: s.SchemNo,
            driveDate: s.DriveDate.substring(0,10),
            showOverTimeSchem: this.showOverTime ? 1 : 0
        });
    }
    /**
     * 前往客流汇总
     */
    gotoPassengerFlowSummary() {
        this.navCtrl.push('PassengerFlowSummaryPage');
    }

    showLog(){
        this.navCtrl.push('LogMenuPage');
    }
}

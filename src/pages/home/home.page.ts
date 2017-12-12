import { CacheData } from './../../providers/storage/CacheData';
import { Station } from './../../module/Station';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { Component } from '@angular/core';
import { ActionSheetController, MenuController, NavController } from 'ionic-angular';
import { dateValueRange } from 'ionic-angular/util/datetime-util';

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html'
})
export class HomePage {
    upStation: string;
    today = new Date();
    stationSelected: boolean = false;
    stationSelectClass: {};
    menuClass: {};
    stations: Array<Station> = undefined;
    selectedStation: Station;
    constructor(public navCtrl: NavController, public http: HttpServices, public action: ActionSheetController,
        public menu: MenuController) {
        this.upStation = "请选择乘车站";
    }
    ionViewDidLoad() {
        this.setTitleClass();
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
    /**获取可查询车站 */
    requestCanSelectedStation() {
        if (this.stations == undefined) {
            this.http.postRequest<Array<Station>>(CommandKeys.canSelectedStation, null, value => {
                if (value.success) {
                    this.stations = value.object;
                    this.showStationDialog();
                }
                return false;
            });
        }else{
            this.showStationDialog();
        }
    }

    showStationDialog() {
        let bts = [];
        this.stations.forEach((value, index) => {
            bts[index] = {
                text: value.StationName,
                handler: () => {
                    this.selectedStation = value;
                    this.upStation = value.StationName;
                    CacheData.stationId = this.selectedStation.ID;
                    if (!this.stationSelected) {
                        this.stationSelected = true;
                        this.setTitleClass();
                    }
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

    showSearchDialog() {
        this.action.create({
            buttons: [
                {
                    text: '车次售票查询',
                    handler: () => {

                    }
                },
                {
                    text: '售票明细查询',
                    handler: () => {

                    }
                },
                {
                    text: '票号追踪查询',
                    handler: () => {

                    }
                },
                {
                    text: '疑问班次查询',
                    handler: () => {

                    }
                }
            ],
            enableBackdropDismiss: true
        }).present();
    }
}

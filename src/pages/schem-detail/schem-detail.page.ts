import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

import { SchemItem } from '../../module/SchemItem';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { SchemDetailKeepSeatPage } from '../schem-detail-keep-seat/schem-detail-keep-seat.page';
import { SchemDetailModifyPage } from '../schem-detail-modify/schem-detail-modify.page';
import { SchemDetailStopSalePage } from '../schem-detail-stop-sale/schem-detail-stop-sale';
import { SearchBusSalePage } from '../search-bus-sale/search-bus-sale.page';
import { HttpServices } from './../../providers/http/http.service';
import { DialogUtil } from './../../utils/DialogUtil';
import { SchemDetailClonePage } from './../schem-detail-clone/schem-detail-clone.page';
import { SchemDetailShiftClosePage } from './../schem-detail-shift-close/schem-detail-shift-close.page';

/**
 * Generated class for the SchemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-schem-detail',
    templateUrl: 'schem-detail.page.html',
})
export class SchemDetailPage {
    schem: SchemItem;
    schemNo:string;
    driveDate:string;
    stationId:string;
    showOverTimeSchem:number;
    constructor(public navCtrl: NavController, public navParams: NavParams, public dialog: DialogUtil,
        public http: HttpServices, public event: Events) {
        this.schemNo = navParams.get("schemNo");
        this.driveDate = navParams.get("driveDate");
        this.showOverTimeSchem = navParams.get("showOverTimeSchem");
        this.requestSchemItem();
    }
    ionViewDidLoad() {
    }
    ionViewWillUnload() {
    }
    modifyClick() {
        this.navCtrl.push(SchemDetailModifyPage, { schem: this.schem,callback:()=>{
            this.requestSchemItem();
        } });
    }
    cloneClick() {
        this.navCtrl.push(SchemDetailClonePage, { schem: this.schem });
    }
    shiftOpen() {
        if (this.schem.IsRun == 0) {
            this.dialog.simpleMessageDialog("确定对改班次开班？", () => {
                this.requestShiftOpen();
            });
        } else {
            this.dialog.showAtMiddleToast("该班次已开班");
        }
    }
    requestSchemItem(){
        let content = {
            "StationID": CacheData.stationId,
            "SchemNo": this.schemNo,
            "DriveDate":this.driveDate,
            "StopNo":"",
            "ShowOverTimeSchem": this.showOverTimeSchem
        };
        this.http.postRequest(CommandKeys.schemlist, content, value => {
            if (value.success) {
                this.schem = value.object[0];
            }
            return false;
        });
    }
    requestShiftOpen() {
        let content = {
            "StationID": CacheData.stationId,
            "SchemID": this.schem.SchemID
        };
        this.http.postRequest(CommandKeys.shiftOpen, content, value => {
            if (value.success) {
                this.schem.IsRun = 1;
            }
            return false;
        });
    }
    shiftClose() {
        if(this.schem.IsDeparture == 0){
            this.dialog.showAtMiddleToast("配载班次开停班必须由始发站操作");
            return;
        }
        if (this.schem.IsRun == 1) {
            this.navCtrl.push(SchemDetailShiftClosePage, {
                schem: this.schem, callback: () => {
                    this.requestSchemItem();
                }
            })
        } else {
            this.dialog.showAtMiddleToast("该班次已停班");
        }
    }
    keepClick() {
        this.navCtrl.push(SchemDetailKeepSeatPage, {
            schem: this.schem ,callback: () => {
                this.requestSchemItem();
            }
        });
    }
    shiftDetail() {
        if (this.schem.SchemID) {
            this.navCtrl.push(SearchBusSalePage, { schem: this.schem });
        }
    }
    stopSaleClick() {
        this.navCtrl.push(SchemDetailStopSalePage, { schem: this.schem });
    }
}

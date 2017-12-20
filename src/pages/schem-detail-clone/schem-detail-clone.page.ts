import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusType } from '../../module/BusType';
import { Company } from '../../module/Company';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { SchemItem } from './../../module/SchemItem';
import { HttpServices } from './../../providers/http/http.service';
import { BusTypeSearchPage } from './../bus-type-search/bus-type-search.page';
import { CompanySearchPage } from './../company-search/company-search.page';
import { ToastUtil } from '../../utils/ToastUtil';
import { BusId } from '../../module/BusId';
import { BusIdSearchPage } from '../bus-id-search/bus-id-search.page';

/**
 * Generated class for the SchemDetailClonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-clone',
    templateUrl: 'schem-detail-clone.page.html',
})
export class SchemDetailClonePage {
    schem: SchemItem;
    /* 发车时间 */
    selectTime:string; 
    /* 起座号 */
    startSeatNo:number;
    /* 座位数 */
    totalSeatNum:number;
    /* 班次号 起 */
    startSchemNo:number;
    /* 班次号 止 */
    endSchemNo: number;
    /* 车型 */
    selectedBusType: BusType;
    /* 检票口 */
    checkGateNo:string;
    /* 类别 1 正班 2 加班 */
    schemType:number;
    /* 0开班 1停班 */
    isRun:number;
    /* 可选最小日期 */
    minDate:string;
    /* 可选最大日期 */
    maxDate:string;
    /* 选择的开始日期 */
    selectStartDate:string;
    /* 选择的结束日期 */
    selectEndDate:string;
    /* 选择的承运单位 */
    selectCompany:Company;
    /* 选择的车牌 */
    selectBusId:BusId;

    constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpServices,public action:ActionSheetController,
        public toast:ToastUtil) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11, 16);
        this.selectStartDate = this.schem.DriveDate.substring(0,10);
        this.selectEndDate = this.schem.DriveDate.substring(0,10);
        this.schemType = this.schem.SchemTypeCode;
        this.isRun = this.schem.IsRun;
        this.startSeatNo = this.schem.StartSeatNo;
        this.totalSeatNum = this.schem.TotalSeatNum;
        this.startSchemNo = this.schem.SchemNo;
        this.endSchemNo = this.schem.SchemNo;
        this.checkGateNo = this.schem.CheckGateNo;
    }

    ionViewDidLoad() {
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
    }
    /* 选择车型 */
    busTypeClick(){
        this.navCtrl.push(BusTypeSearchPage, {
            callback: (busType: BusType) => {
                return new Promise((resolve) => {
                    this.selectedBusType = busType;
                    resolve("ok");
                });
            },
            busTypeName:this.schem.BusTypeName
        });
    }
    busIdClick(){
        this.navCtrl.push(BusIdSearchPage, {
            callback: (busId: BusId) => {
                return new Promise((resolve) => {
                    this.selectBusId = busId;
                    resolve("ok");
                });
            },
            licenseNo: this.schem.LicenseNo
        });
    }
    /* 选承运单位 */
    companClick(){
        this.navCtrl.push(CompanySearchPage, {
            callback: (company: Company) => {
                return new Promise((resolve) => {
                    this.selectCompany = company;
                    resolve("ok");
                });
            },
            company:this.schem.CarrayCompanyName
        });
    }
    confirmClick(){
        this.requestClone();
    }
    cancelClick(){
        this.navCtrl.pop();
    }
    requestClone(){
        let content = {
            "StationID":CacheData.stationId,
            "SourceTagStr":this.schem.SchemID,
            "StartDate":this.selectStartDate,
            "EndDate":this.selectEndDate,
            "DriveTime":this.selectTime,
            "StartSchemNo":this.startSchemNo,
            "EndSchemNo":this.endSchemNo,
            "isNormal":this.schemType,
            "StartSeatNo":this.startSeatNo,
            "SeatNum":this.totalSeatNum,
            "BusType":this.selectedBusType.BusTypeName,
            "CompanyId":this.selectCompany.CompanyID,
            "BusId":this.selectBusId.BusID
        };
        this.http.postRequest(CommandKeys.clone,content,value=>{
            if(value.success){
                this.toast.showAtMiddle("克隆成功",800);
                setTimeout(() => {
                    this.navCtrl.pop();
                }, 800);
            }
            return false;
        });
    }
}

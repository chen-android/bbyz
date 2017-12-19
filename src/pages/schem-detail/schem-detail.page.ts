import { SchemDetailShiftClosePage } from './../schem-detail-shift-close/schem-detail-shift-close.page';
import { ToastUtil } from './../../utils/ToastUtil';
import { HttpServices } from './../../providers/http/http.service';
import { DialogUtil } from './../../utils/DialogUtil';
import { SchemDetailClonePage } from './../schem-detail-clone/schem-detail-clone.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SchemItem } from '../../module/SchemItem';
import { SchemDetailModifyPage } from '../schem-detail-modify/schem-detail-modify.page';
import { CommandKeys } from '../../utils/CommandKeys';
import { CacheData } from '../../providers/storage/CacheData';

/**
 * Generated class for the SchemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail',
    templateUrl: 'schem-detail.page.html',
})
export class SchemDetailPage {
    schem: SchemItem;
    constructor(public navCtrl: NavController, public navParams: NavParams,public dialog:DialogUtil,
        public http:HttpServices,public toast:ToastUtil) {
        this.schem = navParams.get("schem");
    }

    ionViewDidLoad() {

    }
    modifyClick() {
        this.navCtrl.push(SchemDetailModifyPage, { schem: this.schem });
    }
    cloneClick() {
        this.navCtrl.push(SchemDetailClonePage, { schem: this.schem });
    }
    shiftOpen(){
        if(this.schem.IsRun == 1){
            this.dialog.simpleMessageDialog("确定对改班次开班？",()=>{
                this.requestShiftOpen();
            });
        }else{
            this.toast.showAtMiddle("该班次已开班");
        }
    }
    requestShiftOpen(){
        let content = {
            "StationID":CacheData.stationId,
            "SchemID":this.schem.SchemID
        };
        this.http.postRequest(CommandKeys.shiftOpen,content,value=>{
            if(value.success){
                this.schem.IsRun = 0;
            }
            return false;
        })
    }
    shiftClose(){
        if (this.schem.IsRun == 1) {
            this.navCtrl.push(SchemDetailShiftClosePage, { schem: this.schem })
        }else{
            this.toast.showAtMiddle("该班次已停班");
        }
    }
    
}

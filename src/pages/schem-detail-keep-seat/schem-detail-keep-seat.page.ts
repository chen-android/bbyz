import { KeepReasonComponent } from '../../component/keep-reason/keep-reason.component';
import { CacheData } from '../../providers/storage/CacheData';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SchemItem } from '../../module/SchemItem';
import { HttpServices } from '../../providers/http/http.service';
import { CommandKeys } from '../../utils/CommandKeys';
import { BusStatus } from '../../module/BusStatus';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { DialogUtil } from '../../utils/DialogUtil';
import { EventKeys } from '../../utils/EventKeys';

/**
 * 留座界面
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-keep-seat',
    templateUrl: 'schem-detail-keep-seat.page.html',
})
export class SchemDetailKeepSeatPage {
    schem: SchemItem;
    statusList: Array<BusStatus>;
    keepList: Array<boolean> = new Array();
    addList: Array<string> = new Array();
    delList: Array<string> = new Array();
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices,
        public pop: PopoverController, public dialog: DialogUtil) {
        this.schem = navParams.get("schem");
    }

    ionViewDidLoad() {
        this.requestKeepStatus();

    }
    requestKeepStatus() {
        this.http.postRequest<Array<BusStatus>>(CommandKeys.keepStatus, { StationID: CacheData.stationId, SchemID: this.schem.SchemID }, value => {
            if (value.success) {
                this.statusList = value.object;
                this.statusList.forEach((value) => {
                    this.keepList.push(value.StatusID == 3);
                });
            }
            return false;
        })
    }
    confirmClick() {
        this.statusList.forEach((value, index) => {
            if (value.StatusID == 3) {
                if (!this.keepList[index]) {
                    this.delList.push(value.SeatNo.toString());
                }
            } else {
                if (this.keepList[index]) {
                    this.addList.push(value.SeatNo.toString());
                }
            }
        });
        if (this.addList.length > 0) {
            this.showReasonDialog();
        } else {
            if (this.delList.length > 0) {
                this.dialog.simpleMessageDialog("是否确定取消留座", () => {
                    this.requestKeepSeat();
                });
            } else {
                this.navCtrl.pop();
            }
        }

    }
    cancelClick() {
        this.navCtrl.pop();
    }
    showReasonDialog() {
        let p = this.pop.create(KeepReasonComponent, {}, {
            showBackdrop: true,
            enableBackdropDismiss: true
        });
        p.onDidDismiss(data => {
            if (data != EventKeys.conponentCancel) {
                this.requestKeepSeat(data);
            }
        });
        p.present();
    }
    requestKeepSeat(reason?: string) {
        this.addList.join(",");
        this.delList.join(",");
        let content = {
            StationID: CacheData.stationId,
            SchemID: this.schem.SchemID,
            AddedSeatNoList: this.addList.toLocaleString(),
            DeletedSeatNoList: this.delList.toLocaleString(),
            Reason: reason
        };
        this.http.postRequest(CommandKeys.keepSeat, content, value => {
            if (value.success) {
                this.dialog.showAtMiddleToast("操作成功", 800);
                setTimeout(() => {
                    this.navCtrl.pop();
                }, 800);
            }
            return false;
        });
    }
}

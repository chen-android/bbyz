import { SchemItem } from './../../module/SchemItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SchemDetailModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-modify',
    templateUrl: 'schem-detail-modify.page.html',
})
export class SchemDetailModifyPage {
    schem:SchemItem;
    selectTime:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11,16);
    }

    ionViewDidLoad() {

    }
    confirmClick(){

    }
    cancelClick(){
        this.navCtrl.pop();
    }
}

import { SchemItem } from './../../module/SchemItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    selectTime:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11, 16);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SchemDetailClonePage');
    }

}

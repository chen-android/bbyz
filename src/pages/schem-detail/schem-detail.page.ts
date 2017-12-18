import { SchemDetailClonePage } from './../schem-detail-clone/schem-detail-clone.page';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SchemItem } from '../../module/SchemItem';
import { SchemDetailModifyPage } from '../schem-detail-modify/schem-detail-modify.page';

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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}

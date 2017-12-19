import { Site } from './../../module/Site';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    list: Array<string> = new Array();
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageUtils) {
        this.list.push("a");
        console.info(this.list.join(","));
    }
    ionViewDidLoad() {
    }
    clearclick() {
        this.storage.clear();
    }

}

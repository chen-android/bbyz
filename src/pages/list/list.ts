import { Site } from './../../module/Site';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageUtils) {

    }
    ionViewDidLoad() {
    }
    clearclick(){
        this.storage.clear();
    }

}

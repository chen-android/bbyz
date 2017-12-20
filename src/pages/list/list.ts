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
        this.list.push("A");
        this.list.push("B");
        this.list.push("C");
        this.list.push("G");
        this.list.push("T");
        this.list.push("R");
        this.list.push("Y");
        this.list.reverse();
        console.info(this.list);
        let index = this.list.findIndex((value) => {
            if(value == "G"){
                return true;
            }
            return false;
        });
        if (index > 0) {
            this.list.push(this.list.splice(index, 1)[0]);
        }
        this.list.reverse();
        console.info(this.list);
    }
    ionViewDidLoad() {
    }
    clearclick() {
        this.storage.clear();
    }

}

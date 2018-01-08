import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

import { KeepReasonComponent } from '../../component/keep-reason/keep-reason.component';
import { StorageUtils } from './../../providers/storage/StorageUtils';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageUtils,public pop:PopoverController) {
        
    }
    ionViewDidLoad() {
    }
    clearclick() {
        let p = this.pop.create(KeepReasonComponent,{},{
            enableBackdropDismiss:true
        });
        p.onDidDismiss(data=>{
            console.info(data);
        });
        p.present();
    }

}

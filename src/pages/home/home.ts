import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    upStation: string;
    today = new Date();
    constructor(public navCtrl: NavController) {
        this.upStation = "请选择乘车站";
    }
    ionViewDidLoad() {
        
    }
}

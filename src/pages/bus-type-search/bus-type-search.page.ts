import { CacheData } from './../../providers/storage/CacheData';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Site } from '../../module/Site';

/**
 * Generated class for the BusTypeSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bus-type-search',
    templateUrl: 'bus-type-search.page.html',
})
export class BusTypeSearchPage {
    siteList: Array<Site>;
    allData: Array<Site>;
    searchCallBack: (params: Site) => Promise<string>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices) {
        this.searchCallBack = navParams.get("site");
    }

    ionViewDidLoad() {
        this.http.postRequest<Array<Site>>(CommandKeys.site, { "StationId": CacheData.stationId }, value => {
            if (value.success) {
                this.allData = value.object;
                this.setDate();
            }
            return false;
        });
    }
    setDate() {
        this.siteList = this.allData;
    }
    searchInput(ev: any) {
        this.setDate();
        let s: string = ev.target.value;
        if (this.siteList != undefined && s && s.trim() != "") {
            this.siteList = this.siteList.filter(value => {
                return value.StopName.toLowerCase().includes(s.toLowerCase()) || value.SimpleName.toLowerCase().includes(s.toLowerCase());
            })
        }
    }
    itemClick(s:Site){
        this.searchCallBack(s).then(value=>{
            this.navCtrl.pop();
        });
    }
}
